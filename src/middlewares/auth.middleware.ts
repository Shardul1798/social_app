import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Session from "../database/models/session.model";

dotenv.config();
class AuthMiddleware {
  constructor() {}

  checkBasicAuthAndValidate = (req, res, next) => {
    try {
      console.log("_____________");
      const authorization = req.headers.authorization;
      const [authType, token] = authorization.split(/\s+/);
      if (!token) {
        res
          .status(401)
          .set("WWW-Authenticate", 'Basic realm="Authentication required"')
          .send("Authentication required");
        return;
      }
      let checkFunction = this.basicAuthFunction(token);
      if (!checkFunction) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      next();
    } catch (Error) {
      console.log(Error);
      res.status(401).json({ message: "Catch error Unauthorized!" });
    }
  };

  basicAuthFunction(access_token: string) {
    const credentials = Buffer.from(access_token, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    if (username == "Shardul" && password == "shardul@1797") {
      return true;
    }
    return false;
  }

  generateAuthToken = async (userId: any, sessionId: any) => {
    if (!userId) {
      return Promise.reject("Tokenization Error");
    } else {
      try {
        //Session ID along with userId
        const token = await jwt.sign(
          { id: userId, sessionId: sessionId },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        return { accessToken: token };
      } catch (error) {
        console.log(error);

        return Promise.reject("Authentication failed!");
      }
    }
  };

  validateAuthToken = async (req: any, res, next) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const [authType, token] = authorization.split(/\s+/);
      if (!token) {
        res
          .status(401)
          .set("WWW-Authenticate", 'Basic realm="Authentication required"')
          .send("Unauthorized");
          next();
        return;
      }
      let authorizeToken = await this.decodeToken(token);
      req.body.currentUserId = authorizeToken.id;
      if (!authorizeToken) {
        res
          .status(401)
          .set("WWW-Authenticate", 'Basic realm="Authentication required"')
          .send("Unauthorized");
          next();
        return;
      }

      const haveSession: any = await Session.find({
        _id: authorizeToken.sessionId,
        user_id: authorizeToken.id,
      });
      if (haveSession) {
        next();
        return "validated";
      } else {
        next();
        return res
          .status(440)
          .send({ message: "Your session has been expired!" });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Authentication required"')
        .send("Unauthorized");
    }
  };

  decodeToken(token: string) {
    let decodedData = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedData) {
      return decodedData;
    } else {
      return Promise.reject("Invalid Token!");
    }
  }
}

export const authMiddleware = new AuthMiddleware();

import * as Joi from "joi";

class ValidateRequestBody {
  async Login(req: any, res: any, next: () => void) {
    try {
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Validation Error!" });
    }
  }

  async CreatePost(req: any, res: any, next: () => void) {
    try {
      const schema = Joi.object().keys({
        currentUserId: Joi.string().required(),
        media: Joi.array().required(),
        caption: Joi.string().max(200),
        tagged: Joi.array(),
        type: Joi.string().required()
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Validation Error!" });
    }
  }

  async Register(req: any, res: any, next: () => void) {
    try {
      const schema = Joi.object({
        username: Joi.string().required().pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-="']+$/).max(20),
        name: Joi.string().required().max(30).min(2),
        email: Joi.string()
          .required()
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-="']+$/),
        dob: Joi.date().iso().required(),
        gender: Joi.string()
          .required()
          .valid("MALE", "FEMALE", "NOT_TO_SPECIFY"),
        account_privacy: Joi.string().required().valid("PUBLIC", "PRIVATE"),
        phone: Joi.string().required().min(10).max(10),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Validation Error!" });
    }
  }
}

const validateBody = new ValidateRequestBody();
export default validateBody;

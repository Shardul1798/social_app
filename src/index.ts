import express, {Express} from "express";
import { connectToDatabase } from "./database/config/config";

const app: Express = express();

const port = 6002;
const hostname = "127.0.0.1";

connectToDatabase(process.env.CONNECTION_STRING);

app.listen(port, hostname, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});

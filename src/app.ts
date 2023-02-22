import express, { Express } from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { normalizePort } from "./utils/serverConfigHelper";
import swaggerRouter from "./routes/swaggerRouter";

const app: Express = express();

export const port = normalizePort(process.env.PORT || 3000);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, "public")));

app.use("/", swaggerRouter);

app.set("port", port);

export default app;
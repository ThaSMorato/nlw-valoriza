import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import {  router  } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

import "./database";

const app = express();

app.use(express.json());

app.use( router );

app.use( errorHandler )

app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
});
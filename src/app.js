import express from "express";
import cors from "cors";

import chalk from "chalk";

import usersRouter from "./routers/usersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouter);

app.listen(5000, () => {
    console.log(chalk.bgGreenBright("SERVER INICIALIZADO!🚀"));
});
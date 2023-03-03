import express from "express";
import cors from "cors";

import chalk from "chalk";

import usersRouter from "./routers/usersRouter.js";
import urlsRouter from "./routers/urlsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouter);
app.use(urlsRouter);

app.listen(5000, () => {
    console.log(chalk.bgGreenBright("SERVER INICIALIZADO!🚀"));
});
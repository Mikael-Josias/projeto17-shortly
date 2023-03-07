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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bgGreenBright(`SERVER INICIALIZADO NA PORTA ${port}!🚀`));
});
import chalk from "chalk";

import { validateShortenUrl } from "../schemas/urlsSchema.js";

export function validateShortenUrls(req, res, next) {
    const data = req.body;

    const { error , value } = validateShortenUrl.validate(data, { abortEarly: false });
    if (error) return res.sendStatus(422);

    try {
        const url = new URL(value.url);
        
        next();
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URL:") + error);
        res.sendStatus(422);
    }
}
import chalk from "chalk";
import { nanoid } from "nanoid";
import connection from "../database/database.connection.js";

export async function postNewUrl(req, res) {
    const { url } = req.body;
    const shortenedUrl = nanoid();
    
    try {
        
        const result = await connection.query(
            `INSERT INTO links (user_id, url, short_url, visitors) VALUES ($1, $2, $3, $4);`,
            [res.locals.user.id, url, shortenedUrl, 0]);

        const shortUrl = await connection.query(
            `SELECT id, short_url as "shortUrl" FROM links WHERE short_url = $1;`,
            [shortenedUrl]);
        
        res.status(201).send(shortUrl.rows[0]);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URLS:") + error);
        res.sendStatus(500);
    }
}

export async function getUrlById(req, res) {
    const id = req.params.id;

    try {
        const result = await connection.query(
            `SELECT id, short_url as "shortUrl", url FROM links WHERE id = $1;`,
            [id]);
        result.rowCount === 0 ? res.sendStatus(404) : res.send(result.rows[0]);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URLS:") + error);
        res.sendStatus(500);
    }
}

export async function deleteShortUrl(req, res) {
    try {
        const urlId = req.params.id;

        const urlData = await connection.query(
            `SELECT user_id FROM links WHERE id = $1`,
            [urlId]);
        if (urlData.rows[0].user_id !== res.locals.user.id) return res.sendStatus(401);

        const result = await connection.query(
            `DELETE FROM links WHERE id = $1`,
            [urlId]);
        res.sendStatus(204);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URLS:") + error);
        res.sendStatus(404);
    }
}

export async function openUrl(req, res) {
    try {
        const shortUrl = req.params.shortUrl;

        const urlData = await connection.query(
            `SELECT * FROM links WHERE short_url = $1`,
            [shortUrl]);
        if (urlData.rowCount === 0) return res.sendStatus(404);

        const result = await connection.query(
            `UPDATE links SET visitors = $2 WHERE id = $1;`,
            [urlData.rows[0].id, (urlData.rows[0].visitors + 1)]);
        
        res.redirect(urlData.rows[0].url);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URLS:") + error);
        res.sendStatus(500);
    }
}
import { nanoid } from "nanoid";
import connection from "../database/database.connection.js";

export async function postNewUrl(req, res) {
    const { url } = req.body;
    const shortenedUrl = nanoid();
    console.log(shortenedUrl);
    
    try {
        
        const result = await connection.query(
            `INSERT INTO links (user_id, url, short_url, visitors) VALUES ($1, $2, $3, $4);`,
            [res.locals.user.id, url, shortenedUrl, 0]);

        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO URLS:") + error);
        res.sendStatus(500);
    }
}

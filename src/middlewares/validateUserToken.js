import chalk from "chalk";
import connection from "../database/database.connection.js";

export async function validateUserToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        authorization.replace("Bearer ", "");

        const result = await connection.query(
            `SELECT user_id FROM sessions WHERE token = $1`,
            [authorization]);
        if (result.rowCount === 0) return res.sendStatus(401);
        
        res.locals.user = {
            id: result.rows[0].user_id
        };

        next();
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO TOKEN:") + error);
        res.sendStatus(500);
    }
} 
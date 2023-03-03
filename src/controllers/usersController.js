import chalk from "chalk";
import connection from "../database/database.connection.js";

export async function postSignUpUser(req, res) {
    try {
        const data = req.body;

        const emailAlreadyExists = await connection.query(
            `SELECT id FROM users WHERE email = $1;`,
            [data.email]);
        if (emailAlreadyExists.rowCount !== 0) return res.sendStatus(409);
        
        const result = await connection.query(
            `INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4);`,
            [data.name, data.email, data.password, new Date()]);
        
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO USERS:") + error);
        res.sendStatus(500);
    }
}
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

import chalk from "chalk";

import connection from "../database/database.connection.js";

export async function postSignUpUser(req, res) {
    try {
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10);

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

export async function postSignInUser(req, res) {
    try {
        const data = req.body;

        const user = await connection.query(
            `SELECT id, password FROM users WHERE email = $1`,
            [data.email]);
        if (user.rowCount === 0) return res.sendStatus(401);

        if (!bcrypt.compareSync(data.password, user.rows[0].password)) return res.sendStatus(401);

        const token = nanoid();

        await connection.query(
            `INSERT INTO sessions (user_id, token, created_at) VALUES ($1, $2, $3)`,
            [user.rows[0].id, token, new Date()]);
        
        res.send({token});
    } catch (error) {
        console.log(chalk.white.bgRed("ERRO USERS:") + error);
        res.sendStatus(500);
    }
}
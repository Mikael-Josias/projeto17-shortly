import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDataBase = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
};

const connection = new Pool(configDataBase);
export default connection;
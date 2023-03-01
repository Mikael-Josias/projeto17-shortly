import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDataBase = {
    connectionString: process.env.DATABASE_URL,
    ...(process.env.NODE_ENV === "production" && {
        ssl: {
            rejectUnauthorized: false,
        },
    }),
};

const connection = new Pool(configDataBase);
export default connection;
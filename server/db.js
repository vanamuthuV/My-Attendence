import pg from "pg"
import dotenv from "dotenv"
import pgPromise from "pg-promise"

dotenv.config()

const {Pool} = pg

const newpool = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
};

const poolconfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : newpool;
  
const pool = new Pool(poolconfig);

export default pool;
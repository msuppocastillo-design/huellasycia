import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
  host: process.env.BD_HOST || 'localhost',
  user: process.env.BD_USER,
  password: process.env.BD_PASS,
  database: process.env.BD_BD,
  port: Number(process.env.BD_PORT) || 5432
})

export default pool

import pkg from 'pg';
const { Client, Pool } = pkg;
import dotenv from 'dotenv'
dotenv.config()
const env = process.env

const client = new Client({
  host: "inovasistemas.postgresql.dbaas.com.br",
  user: "inovasistemas",
  port: 5432,
  password: "Inova@123",
  database: "inovasistemas"
});

const pool = new Pool({
  host: "inovasistemas.postgresql.dbaas.com.br",
  user: "inovasistemas",
  port: 5432,
  password: "Inova@123",
  database: "inovasistemas",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export {
  client,
  pool
}
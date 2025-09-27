import pkg from "pg"
import dotenv from "dotenv"
dotenv.config()
const {Pool} = pkg

//creating connection pool
const pool = new Pool({
    connectionString:process.env.DATABASE_URL
})


export default pool
import dotenv from 'dotenv'
dotenv.config()
export const configSql2 = { 
    client:'mysql2',
    connection:{
        host: process.env.HOST,
        user: process.env.USERDB,
        password: process.env.PASSWORDDB,
        database: process.env.DATABASE
    }
}
export const configSqlite = {
    client:'sqlite3',
    connection:{
        filename: "./DB/ecommerce.sqlite3"
    },
    useNullAsDefault: true
}



// node-postgres doc: https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
// deploy PERN app to Heroku: https://www.youtube.com/watch?v=ZJxUOOND5_A&t=138s&ab_channel=TheStoicProgrammers

const { Pool } = require('pg')
require('dotenv').config()

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  post: process.env.PG_PORT,
}

const proConfig = {
  connectionString: process.env.PRODUCTION_DATABASE_URL, //heroku addons
  ssl: {
    rejectUnauthorized: false,
  },
}

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = pool

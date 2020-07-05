
import dotenv from 'dotenv'

const Config = dotenv.config({path: __dirname+'../.env'}).parsed

var PRODUCTION = process.env.NODE_ENV === 'production'

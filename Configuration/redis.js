const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    host:process.env.REDISHOST,
    port:process.env.REDISPORT,
    password:process.env.REDISPASSWORD
})

module.exports = {
    client
}
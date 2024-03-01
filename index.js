const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./Configuration/db.js')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Basic Routes
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to mathango kanban board backend...!');
});

// Server Connection
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`Connection to DB established server listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log('Falied to connect DB');
        console.log(error);
    }
})
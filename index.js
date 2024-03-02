const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {passport} = require('./Configuration/google-oauth.js');
require('dotenv').config();
const {connection} = require('./Configuration/db.js')
const {cacheMiddleware} = require('./Middlewares/cacheMiddleware.js')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Basic Routes
app.get('/',cacheMiddleware,(req,res)=>{
    res.status(200).send('Welcome to mathango kanban board backend...!');
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    const user = req.user;
    const token = jwt.sign({userID:user._id},'Secret Token',{expiresIn:'1h'});
    res.json({token,user});
    // res.redirect('/');
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
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');

dotenv.config({
    path:'./.env'
});

const db  = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: '',
    database: process.env.DATABASE
});


const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');


db.connect((err,result)=>{
   if(err) {
    console.log("Error connecting to "+err);
   }else{
    console.log("Connected to "+result);
   }
})
app.get("/",(req, res) => {
    // res.send("Home Page")
    res.render("index")
});


// app.get("/register",(req, res) => {
//     // res.send("Home Page")
//     res.render("register.hbs")
// });
app.use('/', require('./routes/page.js'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, ()=>{
    console.log('listening on port '+PORT);
});
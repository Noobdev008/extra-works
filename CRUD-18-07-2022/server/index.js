const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 8000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUDDataBase',
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviewss" 
    db.query(sqlSelect,(err,result) => {
       console.log(result)
       res.send(result)
    })

})
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviewss(movieName,movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    })
    console.log(req.body)
})

app.delete("/api/delete/:movieName",(req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviewss WHERE movieName=?"
     db.query(sqlDelete,name,(err,result)=>{
        if(err){console.log(err)} ;
     })
     console.log("Delete movie_reviews");

})
app.put("/api/update/",(req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviewss SET movieReview = ? WHERE movieName =?"
     db.query(sqlUpdate,[review,name],(err,result)=>{
        if(err){console.log(err)} 
     })
     console.log("Update movie_reviews");

})

app.listen(port, () => {
    console.log('listening on port ' + port);
});
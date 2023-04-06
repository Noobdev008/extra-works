const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: '',
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log("Error " + err);
        }
        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already registered'
            });
        } else if (password !== confirmPassword) {
            return res.render('register', {
                message: 'That password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

db.query('INSERT INTO users SET ?',{
    name:name,
    email:email,
    password:hashedPassword,
},(err,result)=>{
   if(err){
    console.log("Error auth "+err);
   }else{
    console.log(result);
    return res.render('register', {
        message: 'User registered successfully'
    });
   }
})

    })
    // res.send("Form Submitthed")
    //    res.json({

    //    })
}
exports.login = (req, res) => {
    console.log(req.body);
    // const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log("Error " + err);
        }
        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already registered'
            });
        } else if (password !== confirmPassword) {
            return res.render('register', {
                message: 'That password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

db.query('INSERT INTO users SET ?',{
    name:name,
    email:email,
    password:hashedPassword,
},(err,result)=>{
   if(err){
    console.log("Error auth "+err);
   }else{
    console.log(result);
    return res.render('register', {
        message: 'User registered successfully'
    });
   }
})

    })
    // res.send("Form Submitthed")
    //    res.json({

    //    })
}
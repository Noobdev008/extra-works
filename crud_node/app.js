// importing modules\
require('dotenv').config();
const express = require('express');

const dbConnection = require('./config/databse');
const models = require('./models/models');

//importing routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// express app
const app = express();
const port = process.env.port || 8000;

// express middleware
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    res.json(err);
})

dbConnection((response) => {
    if (!response.error) {
        models.init(response.db);
        app.listen(port, () => {
            console.log("server is running")
        })
    }
});

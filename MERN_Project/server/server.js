const express = require('express');
const connectDB = require('./config/config');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const pizzaRouter = require('./routes/pizza.routes');
const userRouter = require('./routes/user.routes')
const paymentRouter = require('./routes/order.routes');
require('colors')



const port = process.env.PORT || 8080;

connectDB()

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/pizzas', pizzaRouter)
app.use('/api/user', userRouter)
app.use('/api/order', paymentRouter)
// app.get('/', (req, res) => {
//     res.send("hello")
// });





app.listen(port, (req, res) => {
    console.log(`Server listening on ${process.env.NODE_ENV} mode on port no ${port}`.bgMagenta);
});
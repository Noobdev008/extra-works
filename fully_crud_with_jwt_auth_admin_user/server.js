const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
app.use(express.json());
app.use(cors());



// app.get('/', (req, res) => {
//     res.send("Hi there!");
// });

app.use('/api/v1' , userRouter);
app.use('/api/v1' , postRouter);

app.listen(PORT, (req, res) => {
    console.log("listening on port " + PORT);
});
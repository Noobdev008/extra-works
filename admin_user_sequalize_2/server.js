const express =  require('express');
const cors = require('cors')
const app = express();

const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')
// const userCtrl = require('./controller/user.controller')
const PORT = 8000;
require('./model/user.model');

app.use(express.json());
// use cors
app.use(cors());

app.use('/api',userRouter);
app.use('/api',postRouter);
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});

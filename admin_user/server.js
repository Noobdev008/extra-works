const express = require('express');
const app = express();
const PORT = 8000
const userRouter = require('./router/user.router')
const postRouter = require('./router/post.router')

// app.get('/', (req, res) => {
//     res.send('Hi')
// })
app.use(express.json());
app.use('/api',userRouter)
app.use('/api/',postRouter)
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})
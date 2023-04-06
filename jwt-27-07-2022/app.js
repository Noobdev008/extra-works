const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
const PORT = 8000;

app.use(express.json());
app.use('/api/users',userRouter);



// app.get('/',(req,res)=>{
//     res.status(200).json({
//         success:1,
//         message:"This is rest api working"
//     })
// });

app.listen(PORT,()=>{
    console.log("listening on port " +PORT);
});
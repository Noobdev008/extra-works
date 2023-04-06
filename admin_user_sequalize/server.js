const express =  require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const bodyparser = require('body-parser');


var Publishable_Key = 'pk_test_51LeY48SI0h4YZIpmQ16cCoNHlq6hpHHHruNg4J8dPQpb34P7Jw6lroRJHmQROUyFAOWWLUukKQh1pnINq4hNO0dw00FBJrjInL'
var Secret_Key = 'sk_test_51LeY48SI0h4YZIpmxIUZW01Em5KADIjdxWsHKC35rOg9ZGi3aBcfZ4ySR3HSjs4ssi5l52u2cUYowMpE26A2BEEZ00ESQmQhbn'
const stripe = require('stripe')(Secret_Key)


const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')

// const userCtrl = require('./controller/user.controller')
const PORT = 8000;
require('./model/user.model');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use(express.static('public'));
// use cors
app.use(cors());

app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'checkout.ejs')

app.use('/api',userRouter);
app.use('/api',postRouter);
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});

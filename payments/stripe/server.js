const express =  require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const PORT = 8001;
var Publishable_Key = 'pk_test_51LeY48SI0h4YZIpmQ16cCoNHlq6hpHHHruNg4J8dPQpb34P7Jw6lroRJHmQROUyFAOWWLUukKQh1pnINq4hNO0dw00FBJrjInL'
var Secret_Key = 'sk_test_51LeY48SI0h4YZIpmxIUZW01Em5KADIjdxWsHKC35rOg9ZGi3aBcfZ4ySR3HSjs4ssi5l52u2cUYowMpE26A2BEEZ00ESQmQhbn'
const stripe = require('stripe')(Secret_Key)

const stripeRoute = require('./routes/stripe.route')

require('./model/stripe.model');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use(cors());
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'checkout.ejs')

app.use('/api',stripeRoute);
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});
let db = require('../db/db.config');
var Publishable_Key = 'pk_test_51LeY48SI0h4YZIpmQ16cCoNHlq6hpHHHruNg4J8dPQpb34P7Jw6lroRJHmQROUyFAOWWLUukKQh1pnINq4hNO0dw00FBJrjInL'
var Secret_Key = 'sk_test_51LeY48SI0h4YZIpmxIUZW01Em5KADIjdxWsHKC35rOg9ZGi3aBcfZ4ySR3HSjs4ssi5l52u2cUYowMpE26A2BEEZ00ESQmQhbn'
const stripe = require('stripe')(Secret_Key)
const YOUR_DOMAIN = 'http://localhost:8001'

let Stripe = db.stripe

const payment = (req, res) => {
    // console.log(req.body , " payment");
    res.render('checkout.ejs', {
        key: Publishable_Key
    })
    // res.send("hiii")
}

const paymentDone = async (req, res) => {
    
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1LeZyxSI0h4YZIpmM06qBrbi',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.ejs`,
        cancel_url: `${YOUR_DOMAIN}/cancel.ejs`,
      });

    //  console.log(session ," sessions");
    let orderid = session.id
    let amount= session.amount_total
    let currency = session.currency;
    let method = session.payment_method_types;
    method =  method.toString();

    // console.log(data , ' data');
      res.redirect(303, session.url);
        // const succesfully = await Users.update({ payment_done: 1 })
        // console.log(succesfully, " Successfully updated payment");
        // res.send("success");
        let data  =  await Stripe.create({orderid: orderid, amount: amount, method: method , currency: currency, payment_done:1})
}

module.exports ={
    payment,
    paymentDone,
}

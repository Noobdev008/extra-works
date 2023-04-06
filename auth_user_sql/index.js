const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./src/routes/user.routes');

app.use(cors());
app.use(express.json())
// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());


app.use('/api/user', userRoute);

app.listen(port , (req, res) => {
    console.log('listening on port ' + port);
})
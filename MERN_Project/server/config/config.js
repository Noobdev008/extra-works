const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify:false,
        })
        console.log(`Database Connected: ${conn.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`Databse not connectd : ${error.message}`.bgRed.white);
    }
}

module.exports=connectDB
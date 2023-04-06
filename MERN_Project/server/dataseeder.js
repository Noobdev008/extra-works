const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

require('colors');
const connectDB = require('./config/config')

const Pizza = require('./model/pizza.model');

const Pizzas = require('./data/pizza-data');

connectDB()

const importData = async () => {
    try {
        await Pizza.deleteMany()
        const sampleData = Pizzas.map(pizza => {
            return { ...pizza }

        })
        await Pizza.insertMany(sampleData)
        console.log('Data import complete'.bgGreen.white);
        process.exit();
    } catch (error) {
        console.log(`Error importing ${error.message}`.bgRed.white);
        process.exit(1);
    }
}

const dataDestroy = () => {}
if(process.argv[2]==='-d'){
    dataDestroy
}else{
    importData()
}

// module.exports= importData;

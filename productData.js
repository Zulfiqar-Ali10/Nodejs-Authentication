require('dotenv').config();
const connectDb = require('./config/config');
const productjson = require('./MOCK_DATA.json');
const Product = require('./models/product');






const start = async ()=>{
    try {
        await connectDb();
        await Product.create(productjson);
        console.log("succes");
    } catch (error) {
        console.log(error);
    }
}

start();
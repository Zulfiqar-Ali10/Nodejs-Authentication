import express from 'express';
import route from './routes/user-routes.js';
import cors from 'cors';
import {connectDb} from './config/config.js';
import pkg from 'body-parser';
const { json } = pkg;
import dotenv from 'dotenv';
import mongoose from "mongoose";



const app = express();

dotenv.config(); 

app.use(json());

console.log("MONGO_URI", process.env.MONGO_URI);


connectDb();

 // Allow all origins
const corsOption = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    CredentialS: true,
    optionSuccessStatus: 204
};
app.use(cors(corsOption));

app.use('/api/user',route);

app.get('/', (req, res) => {
    console.log("req=>" , req);
    res.send("Hello world");
})
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongodb Connect"))
.catch((err)=> console.log("err", err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

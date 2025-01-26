import express from 'express';
import route from './routes/user-routes.js';
import cors from 'cors';
import {connectDb} from './config/config.js';
import pkg from 'body-parser';
const { json } = pkg;
import dotenv from 'dotenv';


const app = express();

dotenv.config(); 

app.use(json());

console.log("MONGO_URI", process.env.MONGO_URI);


connectDb();
app.use(cors()); // Allow all origins

app.use('/api/user',route);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import {connectDb} from './config/config.js';
import pkg from 'body-parser';
const { json } = pkg;
import dotenv from 'dotenv';
import {signUp , signIn} from './controllers/users.js'

const app = express();

dotenv.config(); 

app.use(json());

console.log("MONGO_URI", process.env.MONGO_URI);


connectDb();

 // Allow all origins
const corsOption = {
    origin: 'https://hackathons-sigma-flame.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    CredentialS: true,
    optionSuccessStatus: 204
};
app.use(cors(corsOption));


app.get('/', (req, res) => {
    console.log("req=>" , req);
    res.send("Hello world");
})

app.post('/signup', signUp)
app.post('/signin', signIn)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

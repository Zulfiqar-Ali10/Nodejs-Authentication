import express from 'express'
const route = express.Router();
import {signUp , signIn} from '../controllers/users.js'

route.post('/signUp',signUp);
route.post('/signIn',signIn);


export default route;
import express from 'express'
const route = express.Router();
import {signUp , signIn} from '../controllers/users.js'

route.post('/signup',signUp);
route.post('/signin',signIn);


export default route;
import UsersModule from '../models/user.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const S_KEY = "NOTESAPI";



export const signUp = async (req,res) => {
        
    const {username,email,password} = req.body;

    const exsistingUser = await UsersModule.findOne({email:email})

    try {
        if (exsistingUser) {
            return res.status(400).json({
                message: "user is alredy exsist"
            })
        }
    
        const hashPassword = await bcrypt.hash(password,10);
    
        const result = await UsersModule.create({
            username:username,
            email:email,
            password:hashPassword
        })

        const token = jwt.sign({
            email:result.email,
            id:result._id
        },S_KEY)

         res.status(201).json({
            user:result,
            token:token
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            message:"some thing went wrong"
        })
        
    }
}

export const signIn = async (req,res) => {

       const{email,password} = req.body;

    try {

        const exsistingUser = await UsersModule.findOne({email:email})

        if (!exsistingUser) {
            return res.status(400).json({
                message: "user not found!"
            })    
        }        
        const matchPassword = await bcrypt.compare(password,exsistingUser.password);
        

        if (!matchPassword) {
            return res.status(400).json({
                message: "invalid credentials"
            })    
        }
        
        const token = jwt.sign({
            email:exsistingUser.email,
            id:exsistingUser._id
        },S_KEY)

         res.status(201).json({
            user:exsistingUser,
            token:token
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            message:"some thing went wrong"
        })
        
    }
}



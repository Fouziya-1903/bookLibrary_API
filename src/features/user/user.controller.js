import jwt from "jsonwebtoken";

import { secretKey } from "../../middleware/auth.middleware.js";
import { hasSubscribers } from "diagnostics_channel";

// IN- memory users
let users = [];
let userID = 1;


export function SignUp(req, res){
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: "All fields are required"});
    }

    const existUser = users.find((u)=> u.email == email);
    if(existUser){
        return res.status(400).json({ msg : "The user already exists" });
    }

    const newUser = {
        id : userID++,
        name,email,password
    };

    users.push(newUser);
    
    const token = jwt.sign({ id: newUser.id, email : newUser.email}, secretKey, { expiresIn: "1d",
    },(err,token)=>{
        if(err){
            console.error('Error signing in token: ',err);
        }else{
            console.log("Generated token: ", token);
        }
    });

    res.status(201).json({ msg: "User Registered,",user: newUser, token})
}


export function login(req, res){
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            msg : "Email and password are required!!"
        });
    }

    const user = users.find((u)=> u.email == email && u.password == password);

    if(!user){
        return res.status(400).json({
            msg: "email and password are incorrect"
        });
    }

    const token = jwt.sign({ id: user.id, email : user.email}, secretKey, { expiresIn: "1d",})

    console.log("Generated token (login):", token);
    res.json({ message: "Login successful", user, token });
}


export function home(req,res){
    const user = users.find((u)=> u.id === req.user.id);
    if(!user){
        return res.status(404).json({msg: "User Not found" });
    }
    res.json( { user });
}


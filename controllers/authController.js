import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";





export const registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address} = req.body;

        if(!name)
        {
            return res.send({error:"Name is Required"});
        }
        if(!email)
        {
            return res.send({error:"email is Required"});
        }
        if(!password)
        {
            return res.send({error:"password is Required"});
        }
        if(!phone)
        {
            return res.send({error:"Phone number is Required"});
        }
        if(!address)
        {
            return res.send({error:"Address is Required"});
        }
          // check user
        const exisitingUser = await userModel.findOne({email});
        // user already exisiting
        if(exisitingUser)
        {
            return res.status(200).send({
                success:true,
                message:'User already registered please login',
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user 
        })


    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}



// login controller

export const loginController = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        // find for user

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registred"
            })
        }

        const match = await comparePassword(password,user.password);
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }

        // creating JWT token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          res.status(200).send({
            success:true,
            message:"login successfully",
            user: {
                name: user.name,
                email : user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
          });

   
   
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }

}
// test controller
export const testController = (req,res)=>{
    res.send('protected route');
}
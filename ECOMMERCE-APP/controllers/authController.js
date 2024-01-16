import userModel from "../models/userModels.js"
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";
export const registerController = async(req,res)=>{
    // console.log("1");
    try{
        const {name , email , password ,phone , address} = req.body
        //validation 
        if(!name){
            return res.send({
                error:"Name is required",
            })
        }
        if(!email){
            return res.send({
                error:"Email is required",
            })
        }
        if(!password){
            return res.send({
                error:"Password is required",
            })
        }
        if(!phone){
            return res.send({
                error:"Phone no is required",
            })
        }
        if(!address){
            return res.send({
                error : "Address is Required",
            })
        }

        //Check user
        const existingUser= await userModel.findOne({email});
        //existing User
        if(existingUser){
            return res.status(200).send({
                sucess:true,
                message:'Already Register please login',
            })
        }
        //Register user
        const hashedPassword=await hashPassword(password);

        //Save
        const user = await new userModel({name , email,phone ,address,password:hashedPassword}).save();

        res.status(201).send({
            sucess:true,
            message:'User Register Succesfully',
            user,
        })


    } catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in Registration',
            error
        })
    }
}


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Compare the provided password with the stored password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
            });
        }

        // Generate JWT token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error,
        });
    }
};

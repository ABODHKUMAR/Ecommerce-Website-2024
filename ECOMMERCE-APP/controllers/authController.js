import userModel from "../models/userModels.js"
import { hashPassword } from './../helpers/authHelper.js';
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

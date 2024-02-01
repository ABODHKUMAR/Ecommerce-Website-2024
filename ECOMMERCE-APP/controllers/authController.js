import userModel from "../models/userModels.js"
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";
export const registerController = async(req,res)=>{
    // console.log("1");
    try{
        const {name , email , password ,phone , address,answer} = req.body
        //validation 
        if(!name){
            return res.send({
                message:"Name is required",
            })
        }
        if(!email){
            return res.send({
                message:"Email is required",
            })
        }
        if(!password){
            return res.send({
                message:"Password is required",
            })
        }
        if(!phone){
            return res.send({
                messaage:"Phone no is required",
            })
        }
        if(!address){
            return res.send({
                message : "Address is Required",
            })
        }
        if(!address){
          return res.send({
              message : "Answer is Required",
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
        const user = await new userModel({name , email,phone ,address,password:hashedPassword,answer}).save();

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
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      console.log(password);
      console.log(user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
};
//forgot password
export const forgotPasswordController=async(req,res)=>{
    try{

      const {email,answer,newPassword}=req.body;
      console.log(email,answer,newPassword);
      if(!email){
        res.status(400).send({message:"Email is required"});
      }
      if(!answer){
        res.status(400).send({message:"Question is required"});
      }
      if(!newPassword){
        res.status(400).send({message:"New Password is required"});
      }

      //check email and answer
      const user = await userModel.findOne({email,answer});
      console.log(user);
      if(!user){
        return res.status(404).send({
          sucess:false,
          message:"Wrong Email or Answer",
        })
      }

      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id,{password:hashed});

      res.status(200).send({
        sucess:true,
        messaage:"Password Reset SuccessFully",
      });

    } catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        messaage:'Something ',
        error
      })
    }
} 
  
//test controller
export const testController = (req,res)=>{
    
    res.send("protected Route")
}
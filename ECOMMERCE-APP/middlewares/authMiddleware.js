import JWT from 'jsonwebtoken';
import userModels from '../models/userModels.js';

// Protected Route token Base
export const requireSignIn = async (req, res, next) => {
    try {
        const decoded = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        // If verification is successful, you might want to attach the decoded information to the request
        req.user = decoded;

        // Call the next middleware or route handler
        next();

    } catch (error) {
       console.log(error);
    }
};


//admin Access

export const isAdmin = async (req,res,next) =>{
    try{
        const user = await userModels.findById(req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                sucess:false,
                message:"UnAuthorised Acesss"
            })
        }else{
            next()
        }

    } catch(error) {
        console.log(error);
        res.status(401).send({
            sucess:false,
            error,
            message:"Error in admin middleware",
        })
    }
}


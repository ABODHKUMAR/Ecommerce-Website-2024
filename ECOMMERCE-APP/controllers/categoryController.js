import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';
export const createCategoryController = async(req,res)=>{
    try{

        const {name}=req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is required'
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                sucess:true,
                message:'Category Already Exists',
            })
        }
        const category = await  new categoryModel({
            name , slug:slugify(name)
        }).save();

        res.status(201).send({
            sucess :true,
            message:true,
            message:'New category created',
            category
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            error,
            message:'Error in category'
        })
        
    }
}


// update Category Controller

export const  updateCategoryController = async(req,res)=>{


    try{
        const {name }=req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            sucess:true,
            message:'Category Update Suceesfully',
            category
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            error,
            message :'Error while updating Category',
        })
    }
}

export const categoryController = async(req,res)=>{
    try{
            const category = await categoryModel.find({});
            res.status(200).send({
                sucess:true,
                message:"All category List",
                category,

            })
    }
    catch(error){
        res.status(500).send({
            sucess:false,
            error,
            message:"Error while Creating all categories",
        })
    }
}

export const singleCategoryController= async(req,res)=>{
    try{

        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            sucess:true,
            message:'Get Single Category SuccessFully',
            category,
        })

    }
    catch (error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            error,
            message:'Error while getting  Single Category'
        })

    }
}


export const deleteCategoryController = async(req,res)=>{
    try{    
            const {id} = req.params ;
            await categoryModel.findByIdAndDelete(id)
            res.status(200).send({
                sucess : true,
                message: "Category Deleted Sucessfully",
            })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            error,
            message:'Error while deleting Single message'
        })
    }
}
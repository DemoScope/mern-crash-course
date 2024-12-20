import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct= async (req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({succes:true,data:products});
    } catch (error) {
        console.log("Error in fetching details of products",error.message);
        res.status(500).json({succes:false, message:"Server Error"});
    };
    
}


export const createProduct=async (req,res)=>{
    // res.send("Server is ready");
    const product=req.body; //user wil send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false, message:"Please provide all fields"});
    }

    const newProduct=new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({sucess:true, data:newProduct});
    }catch(error){
        console.error("Error in Create Product",error.message);
        res.status(500).json({succes:false, message:"Server Error"}); 
    }
}

export const updateProduct=async (req, res)=>{
    const {id}=req.params;

    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res(404).json({succes:false,message:"Invalid Product id"});
    }

    try {
        const updateProduct=await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({succes:true, message:"Successfully Updated", data:updateProduct})
    } catch (error) {
        res.status(500).json({succes:false,message:"Server Error "})
    }

}

export const deleteProduct=async (req, res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res(404).json({succes:false,message:"Invalid Product id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        
        res.status(200).json({succes:true,message:"Product deleted"})
    } catch (error) {
        console.log("Error in deleting data", error.message )
        res.status(500).json({succes:false,message: "Server Error"})        
    }
}
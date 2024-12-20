import express from "express"

// import Product from "../models/product.model.js"

// import mongoose from "mongoose";

import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router=express.Router();

//should use app. instead of router. if endpoints are to be included in the server.js file instead of router.js file
//also "/api/products should be used if router.js did not exist"
router.get("/",getProduct)
router.post("/",createProduct);
router.put("/:id",updateProduct)
router.delete("/:id", deleteProduct)


export default router;

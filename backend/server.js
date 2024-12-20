//can use server.js  , app.js,  index.js
//use npm init -y to create node project
//use npm install nodemon to run the server using nodemon
import express from  "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
// import Product from "./models/product.model.js";
// import mongoose from "mongoose";        /These two lines are only used if the router.js did not exist/
import productRoutes from "./routes/products.route.js"
import path from 'path'

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

const __dirname=path.resolve();

app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/FE/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'FE','dist','index.html'))
    })
}
   
// console.log(process.env.MONGO_URI);

app.listen(PORT,()=>{
    connectDB();
    console.log('Server started at http://localhost:'+PORT);
})
// app.listen(5000,()=>{
//     connectDB();
//     console.log('Server started at http://localhost:5000');
// })





//mongodb password- wvA2O9GIQxXxGyiJ
//connecion string- mongodb+srv://kushansenavirathne0:wvA2O9GIQxXxGyiJ@cluster0.a7raz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
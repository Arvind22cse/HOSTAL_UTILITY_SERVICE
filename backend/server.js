import express from "express";
import { connectDB } from "./config/db.js";
const app=express();
import Signup from "./models/signup.model.js";
import router from "./routes/signup.routes.js";
app.use(express.json());
app.use("/api/signup",router);
app.listen(5000,()=>{
    connectDB();
    console.log(`server started at http://localhost:5000`);    

})
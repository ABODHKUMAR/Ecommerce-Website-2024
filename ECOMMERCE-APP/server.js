import express from "express"
import colors from "colors";
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import catagoryRoutes from './routes/categoryRoutes.js'
//Configuration env
dotenv.config();

//database Config
connectDB();
//rest object
const app= express();


//middlewares
app.use(express.json()); // Used send JSON Data In Req, Send .
app.use(morgan('dev'));  // Used Show Api Call in Terminal.


//Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",catagoryRoutes);
//rest api
app.get('/',(req,res)=>{
    res.send("<h1>WelCome to ecommerce app</h1>");
})



//PORT
const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
import express from "express"
import colors from "colors";
import dotenv from 'dotenv'

//Configuration env
dotenv.config();
//rest object
const app= express();

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>WelCome to ecommerce app</h1>");
})



//PORT
const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
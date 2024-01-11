const express = require('express');
const colors = require('colors');

//rest object

const app= express();



//rest api

app.get('/',(req,res)=>{
    res.send({
        message : "Welcome to Ecommerce Appp" ,
    })
})



//PORT

const PORT=8080;

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgCyan.white);
})
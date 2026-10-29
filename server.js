const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const productRoutes = require('./routes/productRoute')

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products', productRoutes);

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("connected to the Database")
    app.listen(PORT, ()=>{
        console.log("Server is running")
    })
})
.catch((err)=>{
    console.log(err);
})
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("Hello from Node API");
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) => {
    try{
        const products = await Product.create(req.body);
        res.status(200).json(products)
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `cannot find any product with the given ID : ${id}`});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: `cannot find any product with the given ID : ${id}`});
        }
        res.status(200).json("product deleted ")

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://mangrajrudra096_db_user:VuZY0B4l2jhv4snx@cluster0.hcxt4pl.mongodb.net/")
.then(()=>{
    console.log("connected to the Database")
    app.listen(3000, ()=>{
        console.log("Server is running")
    })
})
.catch((err)=>{
    console.log(err);
})
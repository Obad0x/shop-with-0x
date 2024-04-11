const express = require('express');
const router = express.Router();
const Products = require('../models/PRODUCT');




router.get('/', (req, res) => {
    console.log('featured ')})

    router.get('/products', async (req, res) => {
        const products = await  Products.find();
        res.status(200).json({message : "success", products: products});
    })


    router.get('/products/:category', async (req,res) => {
        const products = await  Products.find({category: req.params.category});
        res.status(200).json({message : "success", products: products});
    })

    router.get('/products/:id', async (req,res) => {
        const product = await  Products.findById(req.params.id);
        res.status(200).json({message : "success", product: product});
    })

   

    router.post("/search", async (req, res) => {
        try {
            let searchTerm = req.body.searchTerm;
            console.log(searchTerm);
    
            // Construct a regular expression to match any part of the product name
            const regex = new RegExp(searchTerm, "i");
    
            // Search for products where name, description, or category matches the search term
            const data = await Products.find({
                $or: [
                    { name: { $regex: regex } },
                    { description: { $regex: regex } },
                    { Category: { $regex: regex } }
                ]
            })
            .limit(10); // Limiting the result set to 10 documents
    
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    

        router.post('/products', async (req, res) => {
            try{
                const product = new Products(req.body);
                await product.save();
                res.status(200).json({message : "success", product: product});


            }catch(err){
                console.log(err);
            }
            
        })



module.exports = router
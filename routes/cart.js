const express = require('express')
const router = express.Router();
const Cart = require('../models/CART')
const auth = require('../config/checkAuth');
const Product = require('../models/PRODUCT')



router.get('/', auth ,  async(req,res)=>{

   try{
    const id = req.user.id
    console.log(id)
    const cart = await Cart.find({user : req.user.id})
    if(cart){
        console.log(cart)
    }else{
      return res.json(" YOUR CART IS EMPTY")
    }
    
    return res.status(200).json({cart : cart , status : " succcess"})

   }  catch(err){
    return res.status(500).json({error : err.message , status : " failure"})
   }  
})


router.post('/add/:id', auth , async  (req,res)=>{
    try {
        const id = req.user.id  
        const productID = await Product.findById(req.params.id)
       const existingCartitem = await Cart.findOne({user: id ,  Product_id: productID});
       console.log(existingCartitem , productID , id);
       if(existingCartitem){
        console.log('exists')
        // if product ALREADY exists INCREASE QUANTITY
        existingCartitem.Quantity +=1
        existingCartitem.save() // update,
        res.status(200).json({message : "producct updated in cart", cart: existingCartitem})

       }else{
        console.log("doesnt exist")
                // if prduct does not exist add to cart
                const product = await Product.findById(productID);
                if(product ){
                    const cartItem = new Cart({
                        user: id,
                        Product_id: productID,
                        quantity: 1,
                        price: product.price
                    })
                    await cartItem.save();
                    res.status(200).json({message : "product added to cart", status : "success",  cart: cartItem});

                }else{
                    res.status(404).json({
                        message: "product not found",
                        status: "fail"
                    })
                }
       }


}catch (err) {
    res.status(500).json({
        message: err.message,
        status: "error"
    })
}})




// remove from cart 

router.delete('/remove/:id', auth , async(req, res) => {

try{
            const id = req.user.id;
            const productID = await Product.findById(req.params.id)
            const existingCartitem = await Cart.findOneAndDelete({user: id ,  Product_id: productID});
        
           return res.status(200).json({message:  "removed successfully0," , status: "success"});

}catch(err){
    return res.status(500).json({message : err.message, status : " failure"})
}




})


// CHECK OUT 




module.exports = router ;

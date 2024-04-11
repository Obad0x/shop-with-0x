const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Product_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    Quantity :{
        type: Number,
        default: 1
    },
    Price : {
        type: Number,
        
    }

});


module.exports = mongoose.model('Cart', cartSchema);
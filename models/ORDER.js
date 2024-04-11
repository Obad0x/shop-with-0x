const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({

    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_date :{
        type: Date,
        default: Date.now
    },
    shipping_address :{
        type: String,
        required: true
    },
    order_items : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    order_total :{
        type: Number,
       
    },
    order_status :{
        type: String,
        default: 'pending'
    }
})

mondule.exports = mongoose.model('Order', OrderSchema);

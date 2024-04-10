const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema  = new Schema({
            username : {
                type : String,
                required : true,
                unique : true

            },
            password : {
                type : String,
                required : true,
                min : 5 
            },
            First_name :{
                type : String,
                min : 2 
            },
            Last_name : {
                type : String,
                min : 2

            },
            shippingAddresses: [
                {
                    fullName: String,
                    addressLine1: String,
                    addressLine2: String,
                    city: String,
                    state: String,
                    postalCode: String,
                    country: String,
                    phoneNumber: String // Optional
                }
            ],
            order_history: [
                {
                    order_id: String,
                    order_date: Date,
                    order_total: Number,
                    order_status: String,
                    order_products: [
                        {
                            product_id: String,
                            product_name: String,
                            product_price: Number,
                            product_quantity: Number
                        }
                    ]
                }
            ]
            
        })

        module.exports = mongoose.model('USER' , UserSchema);
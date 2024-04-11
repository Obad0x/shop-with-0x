const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
   name : {
    type : String,
    required : true

   },

   description : {
    type : String,
    required : true,
    min : 10 , 
    max : 1000
   },
   Category :{
    type : String ,
    enum : ["Tech" , "Fashion", " HEALTH"]
   },
   image : {
    type : String,
    required : true

   },
   Price : {
    type : Number,
    required : true,
    
   },
   Stock : {
    type : Number,
    required : true,
    min : 0,
   },




});


module.exports = mongoose.model('Product' , productSchema);

const mongoose = require('mongoose');

const connectdb = async  (req, res)=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
    
        console.log('connected to database');

    }
    catch (err) {
        console.log(err);
        res.status(500).json( { message : " failed to connect to database" , err : err.message })
    }

   

}



module.exports = connectdb;
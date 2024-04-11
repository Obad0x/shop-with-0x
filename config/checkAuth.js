const jwt = require('jsonwebtoken');



const CheckAuth = (req, res, next) =>{
    const token = req.cookies.token;
   
    if(!token ){
    
        return res.status(401).json({
            message : ' unauthorized',
            status : 'E NO WORK'
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(500).json({
            message : 'SERVER ERROR',
            status : "fail"
        });
    
}
}

module.exports = CheckAuth
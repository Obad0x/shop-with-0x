require('dotenv').config();
const express = require('express');
const app = express();
const users = require('./routes/user');
const products = require('./routes/Product');
const cart = require('./routes/cart');
const cors = require('cors');
const methodoverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
 const MongoStore = require('connect-mongo');

const connectdb = require('./config/mongodb')

connectdb()

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        
    })
}))
app.use(methodoverride('_method'))






// route handling 

app.get('/', (req, res)=>{
    console.log('hello world')
})
app.use ('/api/users', users);
app.use('/api/products', products);
app.use('/api/cart', cart)

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})

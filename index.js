require('dotenv').config();
const express = require('express');
const app = express();
const users = require('./routes/user');
const cors = require('cors');
const connectdb = require('./config/mongodb')



// middlewares
app.use(cors())
app.use(express.json())
connectdb()





// route handling 

app.get('/', (req, res)=>{
    console.log('hello world')
})
app.use ('/api', users);

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})

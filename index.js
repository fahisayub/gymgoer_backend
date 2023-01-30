const express = require('express');
require('dotenv').config();
const cors=require('cors');
const port=process.env.PORT;
const {connectdb}=require('./config/db.config');
const { userRouter }=require('./routes/user.route');

const app=express();
app.use(express.json());
app.use(cors());


app.use('/user',userRouter);
app.use('/',(req,res)=>{
    res.send('Welcome to GYMGOER');
});

app.listen(port,async()=>{
    try{
        await connectdb;
        console.log('Connected to MongoDB Atlas');

    }catch(e){
        console.log(404,'Error connecting to MongoDB Atlas');

    }
    console.log(`Listening on port ${port}`);

})
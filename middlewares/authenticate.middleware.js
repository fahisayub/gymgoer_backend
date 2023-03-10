const jwt=require('jsonwebtoken');

const authenticate= async (req, res,next) => {

    const token=req.headers.authorization.split(' ')[1];
    if(!token) {
        res.send({"msg":"User not authenticated, Please Login"});
    }else{
        // if token is present 
        const decode= jwt.verify(token,process.env.SECRET_KEY);
        if(decode){
            console.log(decode)
            req.body.uid=decode.uid;
            next();
        }else{
            res.send({'msg':" token expired, Please Login again",token:null});
        }
    }
}



module.exports ={
    authenticate,
}
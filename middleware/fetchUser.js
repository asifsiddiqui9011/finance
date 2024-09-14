const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRETKEY


//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors:"Please authentication using valid email id and password"})
    }
    else {
        try {
            const data = jwt.verify(token,secretKey);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please Authenticate Using Valid Token"})
        }
    }
}

module.exports=fetchUser;
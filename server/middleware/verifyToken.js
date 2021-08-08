// Middleware is basically deals with registering a user, logging in and logging out. Also, we need to keep  checking  whether a user is currently logged in or not.

const jwt = require('jsonwebtoken')

function auth(req, res, next){
       // Get the token from req header x-auth-token
        const authHeaders = req.headers.token
         
        if(authHeaders){
            const token = authHeaders.split(" ")[1]
            jwt.verify(token, process.env.SECRET_KEY,(err, user)=>{
                if(err) res.status(403).json('Token is not valid!')
                req.user = user;
                next();
                
            })
        }else{
           return res.status(403).json('You are not authenticated..')   
        }


}

module.exports = auth
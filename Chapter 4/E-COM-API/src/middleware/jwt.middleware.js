import jwt from "jsonwebtoken";
const jwtAuth = (req,res,next)=>{
    // 1. Read the token.

    const token = req.headers['authorization'];
   
    // 2. if no token, return the error
     if(!token){
        return res.status(401).send('Unauthorized');
    }

    // 3. check if token is valid.
    try{
        const payload = jwt.verify(token,'arT8MJfG4GhmrkmRuQ1wrTImz7wwH3sm');
        req.userID = payload.userID;
    }catch(err){
        return res.status(401).send('Unauthorized');
    }
    next();
    

    // 4. call next middleware

    // 5. return error.
}

export default jwtAuth;
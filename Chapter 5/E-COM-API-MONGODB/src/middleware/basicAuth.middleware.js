
import { UserModel } from "../features/user/user.model.js";

export const basicAuthorizer = (req,res,next)=>{
    // 1. check if authorization header is empty
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log('authHeader',authHeader);
    // 2. Extract crendentials. [Basic qwertyusdfgh]
    const base64Credentials = authHeader.replace('Basic','');
    console.log('base64Credentials',base64Credentials);
    // 3. decode crendentials.

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log('decodedCreds',decodedCreds); // [username:password]

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }

}


// export defualt might give you errors so then think about this 3 points
// default take this 
// hoistedDeclaretion => a function
// class
// assignment expression

// const variablename = ()=>{
//    }

//export default variablename
// you can use like this
import { body } from "express-validator";// this body object refers to req.body
import { validationResult } from "express-validator";

export async function validateRequest(req,res,next){
    // const {name,price,imageUrl} = req.body;
    //     let errors = [];
    //     if(!name || name.trim() == ''){
    //         errors.push('Name is required');
    //     }
    //     if(!price || parseFloat(price) <1){
    //         errors.push('Price must be a positive value');
    //     }
    //     try{
    //         const validUrl = new URL(imageUrl);
    //     }catch(err){
    //         errors.push('Url is invalid');
    //     }

    // express validator
    // 1. first step to use express validator is setup rules for validation.
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({gt:0}).withMessage('Price should '),
        body('imageUrl').custom((value,{req})=>{
            if(!req.file){
                throw new Error("Invalid Image")
            }
            return true;
        })
        // body('imageUrl').isURL().withMessage('Invalid url')
    ];
    // 2. run those rules.
    await Promise.all(rules.map(rules => rules.run(req)));
    // 3. check if there are any errors after running the rules.
    var ValidationErors = validationResult(req);

        // if(errors.length > 0){
        //     return res.render('new-product',{errorMessage : errors[0]});
        // }

        if(!ValidationErors.isEmpty()){
            return res.render('new-product',{errorMessage : ValidationErors.array()[0].msg});
        }
        next();
}
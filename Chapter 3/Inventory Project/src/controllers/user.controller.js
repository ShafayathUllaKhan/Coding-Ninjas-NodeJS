import ProductModel from "../models/product_2.model.js";
import UserModel from "../models/user.model.js";

export default class UserController{

    getRegister(req,res){
        res.render('register');
    }

    getLogin(req,res){
        res.render('login',{
                errorMessage: null
            });
    }

    postRegister(req,res){
        const {name,email,password} = req.body;
        UserModel.add(name,email,password);
        res.render('login',{
                errorMessage: null
            });
    }

    postLogin(req,res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email,password);
        if(!user){
            return res.render('login',{
                errorMessage: 'Invalid Crendentials'
            });
        }
        // after creating session config a session object is attached to req object
        req.session.userEmail = email;
        var products = ProductModel.get();
        res.render('product',{
            products:products, userEmail : req.session.userEmail
        })
    }

    logout(req,res){
        // on log out, destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log('session destroy err ',err);
            }else{
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit');
    }
}
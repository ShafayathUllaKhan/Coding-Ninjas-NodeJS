export const auth = (req,res,next)=>{
    if(req.session.userEmail){
        next();
    } else{
        res.redirect('/login');// redirect method takes url and goes to server.get('/login',usersController.getLogin);
    }
}
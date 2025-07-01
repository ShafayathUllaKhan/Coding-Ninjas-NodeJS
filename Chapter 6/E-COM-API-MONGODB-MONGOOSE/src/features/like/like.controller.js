import { LikeRepository } from "./like.repository.js";

export class LikeController{
    // constructor(){
    //     this.likeRepository = new LikeRepository();
    // }
    async likeItem(req,res,next){
        try{

            const {id,type} = req.body;
            const userId = req.userID;
            const likeRepository = new LikeRepository();
            if(type != 'Product' && type != 'Category'){
                return res.status(400).send('Invalid Type');
            }

            if(type == 'Product'){
                likeRepository.likeProduct(userId,id);
            }else{
                likeRepository.likeProduct(userId,id);
            }
            return res.status(200).send()
        }catch(err){
            return res.status(200).send("Something went wrong");
        }
    }

    async getLikes(req,res,next){
         try{
            const {id,type} = req.query;
            const likeRepository = new LikeRepository();
            const likes = await likeRepository.getLikes(type,id);
            return res.status(200).send(likes);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}
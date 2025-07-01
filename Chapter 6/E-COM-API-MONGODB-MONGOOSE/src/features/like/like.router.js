import express from "express";
import { LikeController } from "./like.controller.js";

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/",likeController.likeItem);

likeRouter.get("/",likeController.getLikes);

export default likeRouter;

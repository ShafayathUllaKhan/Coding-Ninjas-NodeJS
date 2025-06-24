// manage routes / paths to product controller

// 1. Import express.
import express from "express";
import { UserController } from "./user.controller.js";

// 2. Initialize Express router
const userRouter = express.Router();

const userController = new UserController();


userRouter.post("/signup",userController.signUp);
userRouter.post("/signin",userController.signIn);


export default userRouter;
const express= require('express')
const userRouter = express.Router();
const {createUser,loginUser, verifyToken, logoutUser} =require('./userController')
// routes
userRouter.post("/register",createUser );
userRouter.post("/login", loginUser);
userRouter.post('/logout', verifyToken, logoutUser);

module.exports= userRouter

import express from "express";
import {creatNewUser , loginUser , getUserById , getUsers , update , deleteByid} from '../controllers/usersController.js'
import {validregister , validlogin} from '../services/usersServices.js'
import {valid_token} from '../services/validation.js'

export const checkRoles = (role) => (req, res, next) => {
    if (!req.user.user[0])
      return res
        .status(403)
        .json({ status: "error", message: "Unautharized" });
  
    if (!req.user.user[0].roles.includes(role))
      return res.status(403).json({ status: "error", message: "UnAuthorized" });
  
    next();
  };

export const userRouter = express.Router();

userRouter.post("/register" , [validregister , creatNewUser])
userRouter.post("/login" , [validlogin , loginUser])
userRouter.get("/:id" , [valid_token , checkRoles('admin') ,getUserById])  
userRouter.get("/",[valid_token , checkRoles('admin') , getUsers])
userRouter.patch("/:id" , [valid_token ,checkRoles('admin'),update])
userRouter.delete("/:id" , [valid_token ,checkRoles('admin'),deleteByid])


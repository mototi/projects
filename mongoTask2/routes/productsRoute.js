import  express  from "express";
import {createNewProduct , getAll , getProductById ,updateProduct ,deleteByid} from '../controllers/productsController.js'
import {validCreateProduct} from '../services/productServices.js'
import {valid_token} from '../services/validation.js'

export const productsRouter = express.Router();

export const checkRoles = (role) => (req, res, next) => {
    if (!req.user.user[0])
      return res
        .status(403)
        .json({ status: "error", message: "Unautharized" });
  
    if (!req.user.user[0].roles.includes(role))
      return res.status(403).json({ status: "error", message: "UnAuthorized" });
  
    next();
  };

productsRouter.post("/",[valid_token , checkRoles('admin') , validCreateProduct , createNewProduct]);
productsRouter.get("/" , [valid_token , getAll]);
productsRouter.get("/:id" , [valid_token , getProductById]);
productsRouter.patch("/:id" , [valid_token , checkRoles('admin') ,updateProduct])
productsRouter.delete("/:id" , [valid_token , checkRoles('admin') , deleteByid])
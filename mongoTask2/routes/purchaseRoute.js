import  express  from "express";
import{buyPruduct} from '../controllers/purchase.js'
import {valid_token} from '../services/validation.js'
import {validPurchase} from '../services/productServices.js'


export const purchaseRouter = express.Router();

purchaseRouter.patch("/" ,  [validPurchase , valid_token , buyPruduct])

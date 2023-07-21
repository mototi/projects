import {z} from 'zod'

const productSchema = z.object({
    tilte : z.string(),
    price : z.number(),
    rating : z.number(),
    number_of_stocks : z.number()
})

const purchaseSchema = z.object({
  purchased_products : z.array(z.string())
})

export const validCreateProduct = (req, res, next) => {
    try {
      req.body = productSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json(JSON.parse(error.message));
    }
};

export const validPurchase = (req , res , next) => {
  try {
    req.body = purchaseSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
}
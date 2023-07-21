import {create , getProducts , getProduct , update , deleteProduct} from '../model/productsModel.js'

export const createNewProduct = async (req ,res) => {
    const obj = req.body;
    const doc = await create(obj);
    if(!doc){return res.status(500).send("server error")}
    return res.status(201).send("created");
}

export const getAll = async (req , res) => {
    let page = Number(req.query.page||"1");
    let per_page = Number(req.query.per_page||"10");
    if(page == 0) page = 1;
    if (per_page == 0) per_page = 10; 
    try {
        const result = await getProducts (page , per_page);
        if(!result){return res.status(500).send("server error")}
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send("server error")        
    }
}

export const getProductById = async (req , res) => {
    const id = req.params.id ;
    try {
        const result = await getProduct (id);
        if(result.length == 0){return res.status(404).send("product not found")}
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send("server error")        
    }
}

export const updateProduct = async (req , res) => {
    const id = req.params.id;
    const query = {$set : req.body}
    try {
        const result = await update(id , query);
        if(!result.acknowledged){return res.status(400).send("bad request")}
        return res.status(200).send("updated");
    } catch (error) {
        return res.status(500).send("server error")
    }
}
export const deleteByid = async (req,res) => {
    const id =  req.params.id;
    try {
        const result = await deleteProduct(id);
        if(!result.acknowledged){return res.status(400).send("bad request")}
        if(result.deletedCount == 0){return res.status(404).send("not found")}
        return res.status(200).send("deleted");
    } catch (error) {
        return res.status(500).send("server error")
    }
}

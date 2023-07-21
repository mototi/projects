import {product} from '../schemas/products.js'

export const create = async (obj) => {
    let status = 200 ;
    const doc = new product( {
        tilte : obj.tilte ,
        price : obj.price,
        rating : obj.rating,
        number_of_stocks : obj.number_of_stocks
    })
    await doc.save().catch( (e) => { 
        status = undefined
    })
    return status;
}

export const getProducts = async (page , per_page) => {
    try {
        const doc = await product.find().skip(per_page * (page-1)).limit(per_page);
        return doc ;
    } catch (error) {
        return undefined ;
    }
}

export const getProduct = async (id) => {
    try {
        const doc = await product.find({_id : id});
        return doc ;
    } catch (error) {
        return undefined ;
    }
}

export const update = async (id , query) => {
    try {
        const doc = await product.updateOne( {_id : id} , query);
        return doc ;
    } catch (error) {
        return undefined;
    }
}

export const deleteProduct = async (id) => {
    try {
        const doc = await product.deleteOne({_id : id});
        return doc ;
    } catch (error) {
        return undefined;
    }
}
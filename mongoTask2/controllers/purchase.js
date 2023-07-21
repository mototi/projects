import {getProduct , update} from '../model/productsModel.js' 
import {updateuser} from '../model/usersModel.js'

export const buyPruduct = async (req , res) => {
    const user_id = req.user.user[0]._id;
    const product_ids = req.body.purchased_products;

    const fillter = await fillter_ids(product_ids);

    const error = await updated_accepted_products(fillter.accepted)
    if(error == 1) { return res.status(500).send("server error")}

    const query = {$push : {purchased_products : fillter.accepted}}
    const error1 = await updateuser(user_id , query)
    if(!error1) { return res.status(500).send("server error")}

    res.status(200).send("order is placed correctly");

}

const fillter_ids = async (ids) => {
    let obj = { not_valid : [] , out_stock : [] , accepted : []}
    let first_fillter = ["test"];
    for(let i = 0 ; i < ids.length ; i++){
        let test = await getProduct(ids[i]);
        if(!test || test.length == 0) { obj.not_valid.push(ids[i])}
        else {first_fillter.push(test[0])};
    }
    for( let i = 1 ; i < first_fillter.length ; i++){
        if(first_fillter[i].number_of_stocks < 1){
            obj.out_stock.push(first_fillter[i]._id);
        }
        else{
            obj.accepted.push(first_fillter[i]._id)
        }
    }
    return obj;
}

const updated_accepted_products = async (ids) => {
    const query = {$inc : {number_of_stocks : -1}}
    for ( let i = 0 ;  i < ids.length ; i++){
        const result = await update(ids[i] , query)
        if(!result){return 1}
    }
}
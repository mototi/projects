import {user} from '../schemas/users.js'

export const createUser = async (obj) => {
    let status = 200 ;
    const doc = new user( {
        name : obj.name ,
        age : obj.age,
        email : obj.email,
        password : obj.password
    })
    await doc.save().catch( (e) => { 
        if (e.code == 11000) {status = 400}
        else {status = undefined}
    })
    return status;
}

export const login = async (obj) => {
    const doc = await user.find({email : obj.email , password : obj.password} , {__v:0})
    return doc ;
}

export const getUser = async (id) => {
    try {
        const doc = await user.find( {_id : id});
        return doc ;
    } catch (error) {
        return undefined;
    }
}

export const listUsers = async (page , per_page) => {
    const doc = await user.find().skip(per_page * (page-1)).limit(per_page);
    return doc;
}

export const updateuser = async (user_id , query) => {
    try {
        const doc = await user.updateOne( {_id : user_id} , query);
        return doc ;
    } catch (error) {
        return undefined;
    }
}

export const deleteUser = async (id) => {
    try {
        const doc = await user.deleteOne({_id : id});
        return doc ;
    } catch (error) {
        return undefined;
    }
} 
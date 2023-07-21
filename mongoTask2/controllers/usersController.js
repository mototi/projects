import {createHash} from 'crypto';
import {createUser ,login ,getUser,listUsers ,updateuser , deleteUser} from '../model/usersModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });


export const creatNewUser = async (req , res) => {
    const body = req.body;
    const password = body.password;
    const hash_pass = createHash('sha256').update(password , 'utf-8').digest('hex');
    const user = await createUser({name : body.name , age : body.age , email : body.email , password : hash_pass});
    if(user == undefined) { return res.status(500).send("server error")}
    if(user == 400) { return res.status(400).json({error : "email already used before"})}
    return res.status(201).json(req.body);
}

export const loginUser = async (req , res) => {
    const {email , password} = req.body;
    const hashed_pass = createHash('sha256').update(password , 'utf-8').digest('hex')
    const user = await login({email : email , password : hashed_pass});
    if(user.length == 0 ){ return res.status(404).send("sign up first")}
    if (user[0].email == undefined) { return res.status(404).send("sign up first")}
    const token = jwt.sign({user} , process.env.JWT_PASS )
    return res.status(200).json({...user , token})
}

export const getUserById = async (req,res) => {
    try {
        const reslut = await getUser (req.params.id);
        if(!reslut) { return res.status(404).send("not found")}
        if(reslut.length == 0) { return res.status(404).send("not found")}
        return res.status(200).json(reslut)
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const getUsers = async (req,res) => {
    try {
        let page = Number(req.query.page||"1");
        let per_page = Number(req.query.per_page||"10");
        if(page == 0) page = 1;
        if (per_page == 0) per_page = 10; 
        const users = await listUsers(page , per_page);    
        return res.status(200).json(users);        
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const update = async (req , res) => {
    const id = req.params.id;
    const query = {$set : req.body}
    try {
        const result = await updateuser(id , query);
        if(!result.acknowledged){return res.status(400).send("bad request")}
        return res.status(200).send("updated");
    } catch (error) {
        return res.status(500).send("server error")
    }
}

export const deleteByid = async (req,res) => {
    const id =  req.params.id;
    try {
        const result = await deleteUser(id);
        if(!result.acknowledged){return res.status(400).send("bad request")}
        return res.status(200).send("deleted");
    } catch (error) {
        return res.status(500).send("server error")
    }
}
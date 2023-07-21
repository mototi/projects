import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import {userRouter} from './routes/usersRouts.js'
import {productsRouter} from './routes/productsRoute.js'
import {purchaseRouter} from './routes/purchaseRoute.js'

const app = express();

mongoose.connect(process.env.CONNECTION_STRING,{}).then( () => {
    console.log("connected to mongoDB");
}).catch( (e) => {
    console.log(e);
});

app.use(express.urlencoded({ extended:true }) );
app.use(express.json());
app.use("/users" , userRouter);
app.use("/products" , productsRouter)
app.use("/purchase" , purchaseRouter)


app.listen(8080 , () => console.log("server on 8080"));

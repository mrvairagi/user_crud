import mongoose from 'mongoose';
import dotenv from "dotenv";
import { env } from 'process';

dotenv.config()

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, PORT, NODE_ENV } = env;
let URL;

if (NODE_ENV === 'development') {
    URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
} else {
    URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const connnectDB = async() => {
    return await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

connnectDB()
.then((connection)=>{
    console.log(`Connected to Mongo database "${connection.connections[0].name}"`)
})
.catch((error) => {
    console.error('error connecting to mongo', error)
 })
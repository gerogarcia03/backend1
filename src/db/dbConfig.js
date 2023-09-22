import mongoose, { mongo } from "mongoose";

const URL = 'mongodb+srv://gerogarcia2003:28062003@cluster0.kaq81on.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL)
.then(()=> console.log('conectado a base de datos'))
.catch(error=> console.log(error))

const db = {}
db.mongoose = mongoose



export default db


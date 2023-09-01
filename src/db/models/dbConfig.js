import { error } from "console";
import mongoose from "mongoose";

const URL = 'mongodb+srv://gerogarcia2003:eCommerce@cluster0.kaq81on.mongodb.net/eCommerce?retryWrites=true&w=majority'

mongoose.connect(URL)
.then(()=> console.log('conectado a base de datos'))
.catch(error=> console.log(error))

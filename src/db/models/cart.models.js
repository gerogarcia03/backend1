import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'


const cartsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

cartsSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model('carts', cartsSchema)
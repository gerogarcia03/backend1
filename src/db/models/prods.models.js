import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'


const prodsSchema = new mongoose.Schema({
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

prodsSchema.plugin(mongoosePaginate)

export const prodsModel = mongoose.model('productos', prodsSchema)
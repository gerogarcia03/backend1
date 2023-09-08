import mongoose from "mongoose";

const prodsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    id:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})


export const prodsModel = mongoose.model('Productos', prodsSchema)
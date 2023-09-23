import { cartModel } from './db/models/cart.models.js'

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCartProd(obj) {
        try {
            const prods = await cartModel.find(obj)
            return prods
        } catch (error) {
            return error
        }
    }

    async getCartProdById(id) {
        try {
            const prods = await cartModel.findById(id)
            return prods
        } catch (error) {
            return error
        }
    }

    async createCartProd(obj) {
        try {
            const prods = await cartModel.create(obj)
            return prods
        } catch (error) {
            return error
        }
    }

    async deleteCartProd(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }
}

const cartManager = new CartManager()
export default cartManager
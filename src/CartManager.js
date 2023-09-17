import { error } from 'console'
import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCartProd() {
        try {
            if (fs.existsSync(this.path)) {
                const prods = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(prods)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getCartProdById(id) {
        const prods = this.getCartProd()
        const prodId = prods.find((prod) => prod.id === id)
        return prodId
    }

    async createCartProd(obj) {
        try {
            const prods = await this.getCartProd()
            let id
            if (!prods.length) {
                id = 1
            } else {
                id = prods[prods.length - 1].id + 1
            }
            prods.push({...obj, id})
            await fs.promises.writeFile(this.path, JSON.stringify(prods))
        } catch (error) {
            return error
        }

    }
}

const cartManager = new CartManager('./public/cart.json')
export default cartManager
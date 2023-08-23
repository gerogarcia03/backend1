import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCartProd() {
        try {
            if (fs.existsSync('./public/cart.json')) {
                const prods = await fs.promises.readFile('./public/cart.json', 'utf-8')
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

    async createCartProd() {
        const prods = await this.getCartProd()
        let id
        if (!prods.length) {
            id = 1
        } else {
            id = prods[prods.length - 1].id + 1
        }
        const newCartProd = { cart: [], id }
        prods.push(newCartProd)
        await fs.promises.writeFile(this.path, JSON.stringify(prods))
        return newCartProd
    }
}

const cartManager = new CartManager('../public/cart.json')
export default cartManager
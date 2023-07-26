import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
    }


    async getProducts() {
        try {
            if (fs.existsSync('productos.json')) {
                const prods = await fs.promises.readFile('productos.json', 'utf-8')
                return JSON.parse(prods)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(obj, title, description, price, thumbnail, code, stock) {
        try {
            const prods = await this.getProducts()
            let id
            if (!prods.length) {
                id = 1
            } else {
                id = prods[prods.length-1].id + 1
            }

            prods.push({ ...obj, id, title, description, price, thumbnail, code, stock})
            await fs.promises.writeFile(this.path, JSON.stringify(prods))

        } catch (error) {
            return error
        }
    }


    async getProductById(id) {
        try {
            const prods = await this.getProducts()
            const producto = prods.find((prod) => prod.id === id)
            if (!producto) {
                return 'El producto no ha sido encontrado'
            }
            return producto
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj) {
        try {
            const prods = await this.getProducts()
            const prodI = prods.findIndex((prod) => prod.id === id)
            if (prodI === -1) {
                return 'El producto no ha sido encontrado'
            }
            const producto = prods[prodI]
            prods[prodI] = { ...producto, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(prods))
        }
        catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const productos = await this.getProducts()
            const prod = productos.filter((prod) => prod.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(prod),
                console.log(`El producto con el id ${id} ha sido eliminado`)
            )
        } catch (error) {
            return error
        }
    }
}

const productManager = new ProductManager('productos.json')
export default productManager
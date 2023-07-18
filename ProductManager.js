const fs = require('fs')

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

    async addProduct() {
        try {
            const prods = await this.getProducts()
            let id
            if (!prods.length) {
                id++
            }

            prods.push({ ...Object, id })
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
            const prods = await this.getProducts()
            const prod = prods.find((prod) => prod.id === id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(prod)
            )
        } catch (error) {
            return error
        }
    }
}


async function prueba() {
    const manager = new ProductManager('productos.json')
    const producto = await manager.getProducts()
    console.log(producto)
}

prueba()
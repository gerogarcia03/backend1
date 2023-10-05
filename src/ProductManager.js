import { prodsModel } from './db/models/prods.models.js'


class ProductManager {
    constructor(path) {
        this.path = path
    }
    
    async getProducts(obj) {

        const { limit = 10, page = 1, sort, ...query } = obj

        try {
            const result = await prodsModel.paginate(
                query,
                { limit, page, sort }
            )
            const info = {
                status: result.status,
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage
                    ? `http://localhost:8080/api/users?page=${result.prevPage}`
                    : null,
                hasNextPage: result.hasNextPage
                    ? `http://localhost:8080/api/users?page=${result.nextPage}`
                    : null,
                prevLink: result.prevLink,
                nextLink: result.hasNextPage
            }
            return info
        } catch (error) {
            return error
        }
    }

    async addProduct(obj, title, description, price, thumbnail, code, stock) {
        try {
            const prods = await prodsModel.getProducts()
            let id
            if (!prods.length) {
                id = 1
            } else {
                id = prods[prods.length - 1].id + 1
            }
            prods.push({ ...obj, id, title, description, price, thumbnail, code, stock })
            await fs.promises.writeFile(this.path, JSON.stringify(prods))

        } catch (error) {
            return error
        }
    }


    async getProductById(id) {
        try {
            const prods = await prodsModel.findById(id)
            return prods
        } catch (error) {
            return error
        }
    }

    async createProduct(obj) {
        try {
            const prods = await prodsModel.create(obj)
            return prods
        } catch (error) {
            return error

        }
    }

    async updateProduct(id, obj) {
        try {
            const prods = await prodsModel.updateProduct({ _id: id }, { set: { obj } })
            return prods
        }
        catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const response = await prodsModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }

}

const productManager = new ProductManager()
export default productManager
import { prodsModel } from "../db/models/prods.models.js"

class ProdsMongo {

    async findAll(obj) {
        const { limit, page, ...query } = obj
        try {
            const result = await prodsModel.paginate(
                query,
                { limit, page }
            )
            const info = {
                count: result.totalDocs,
                payload: result.docs,
                totalPages: result.totalPages,
                nextLink: result.hasNextPage
                    ? `http://localhost:8080/api/mongo?page=${result.nextPage}`
                    : null,
                prevLink: result.hasPrevPage
                    ? `http://localhost:8080/api/mongo?page=${result.prevPage}`
                    : null,
            }
            return info
        } catch (error) {
            return error
        }
    }

    async findById(id) {
        try {
            const prods = await prodsModel.findById(id)
            return prods
        } catch (error) {
            return error
        }
    }

    async createProd(obj) {
        try {
            const newProd = await prodsModel.create(obj)
            return newProd
        } catch (error) {
            return error
        }
    }

    async prodById(id) {
        try {
            const prods = await prodsModel.findById(id)
            return prods
        } catch (error) {
            return error
        }
    }

    async upadteProd(id, obj) {
        try {
            const prods = await prodsModel.upadteProd({ _id: id }, { set: { obj } })
            return prods
        } catch (error) {
            return error
        }
    }

    async deleteProd(id) {
        try {
            const response = await prodsModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }
}


export const prodsMongo = new ProdsMongo()
import { error } from "console"
import { prodsModel } from "../db/models/prods.models.js"

class ProdsMongo {

    async findAll(obj) {
        const { limit, page, sort, ...query } = obj
        try {
            const result = await prodsModel.paginate(
                query,
                { limit, page }
            )
            const info = {
                status: result.status,
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink,
                nextLink: result.hasNextPage
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
            const newProd = await prodsModel.create(...obj)
            let id
            if (!newProd.length) {
                id = 1
            } else {
                id = newProd[newProd.length - 1].id + 1
            }
            newProd.push(...obj, id)
            await fstat.promises.writeFile(this.path, JSON.stringify(newProd))
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
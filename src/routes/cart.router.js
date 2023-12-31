import { Router } from "express"
import cartManager from '../cartManager.js'
import productManager from "../ProductManager.js"
const router = Router()

router.get('/', async (req, res) => {

    const limit = req.query.limit

    try {
        const prods = await cartManager.getCartProd()
        if (limit) {
            res.json(prods.slice(0, limit))
        }
        res.json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const prods = await cartManager.getCartProdById(+id)
        res.status(200).json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const createCartProd = await cartManager.createCartProd()
        res.status(200).json({createCartProd})
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await productManager.deleteProduct(id)
        res.status(200).json(result)
    } catch (error) {
        res.status
    }
})

export default router
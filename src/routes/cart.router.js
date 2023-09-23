import { Router } from "express"
import cartManager from '../CartManager.js'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const prods = await cartManager.getCartProd(req.query)
        res.status(200).json({ prods })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const prods = await cartManager.getCartProdById(id)
        if (!prods) {
            res.status(400).json({ message: 'no encontramos el ID' })
        } else {
            res.status(200).json({ prods })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const createProduct = await cartManager.createCartProd()
        res.status(200).json(createProduct)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await cartManager.deleteCartProd(id)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
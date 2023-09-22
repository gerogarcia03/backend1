import { Router } from "express"
import productManager from '../ProductManager.js'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const prods = await productManager.getProducts(req.query)
        res.status(200).json({prods})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const prods = await productManager.getProductById(id)
        if (!prods) {
            res.status(400).json({ message: 'no encontramos el ID' })
        } else {
            res.status(200).json({ prods })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    const { id, title, price } = req.body
    if (!id || !title || !price) {
        return res.status(400).json({ message: 'faltan datos' })
    }
    try {
        const createProduct = await productManager.createProduct(req.body)
        res.status(200).json(createProduct)
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
        res.status(500).json({ error })
    }
})


export default router
import { Router } from "express"
import productManager from '../ProductManager.js'
const router = Router()

router.get('/', async (req, res) => {

    const limit = req.query.limit

    try {
        const prods = await productManager.getProducts()

        if (limit) {
            res.json(prods.slice(0, limit))
        }
        res.json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.post('/', async (req, res) => {

    try {
        const newProd = await productManger.createProduct(req.body)
        res.status(200).json('nuevo producto')
    } catch (error) {
        res.status(500).json({ error })
    }

})


router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const prods = await productManger.getProductsById(pid)
        res.json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const updateProd = await productManger.updateProduct(+pid, req.body)
        res.status(200).json('Producto actualizado')
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const del = await productManger.deleteProduct(+pid)
        res.status(200).json('Producto eliminado')
    } catch (error) {
        res.status(500).json({ error })
    }
})


export default router
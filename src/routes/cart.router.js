import { Router } from "express"
import cartManager from '../manager/CartManager.js'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCartProd(req.query)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const cart = await cartManager.getCartProdById(id)
        if (!cart) {
            res.status(400).json({ message: 'no encontramos el ID' })
        } else {
            res.status(200).json(cart)
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const createProduct = await cartManager.createCartProd(req.body)
        res.status(200).json(createProduct)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id
    try {
        const result = await cartManager.clearCart(cartId)
        if (!result){
            return res.status(404).json({error: 'el carrito no fue encontrado'})
        }
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error: 'error al eliminar el carrito' })
    }
})

router.delete('/:id/productos/:pid', async (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.pid
    try {
        const result = await cartManager.deleteCartProd(cartId, prodId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id/productos/:pid', async (req, res) => {
    try {
        const result = await cartManager.updateProduct(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.json(500).json({ error })
    }
})

export default router
import { Router } from "express";
import { prodsMongo } from "../manager/ProdsMongo.js";
const router = Router()

router.get('/',async(req,res)=>{
try {
    const prods = await prodsMongo.findAll(req.query)
    res.status(200).json({ prods })
} catch (error) {
    res.status(500).json({ error })
}
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const prods = await prodsMongo.prodById(id)
        if (!prods) {
            res.status(400).json({ message: 'no encontramos el ID' })
        } else {
            res.status(200).json({prods })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json()
    }
    try {
        const newProds = await prodsMongo.createProd(req.body)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await prodsMongo.deleteStudent(id)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error })
    }
})
export default router
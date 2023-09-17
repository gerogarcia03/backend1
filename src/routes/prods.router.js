import { Router } from "express";
import { prodsMongo } from "../manager/ProdsMongo.js";
import { error } from "console";
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
    try {
        const newProds = await prodsMongo.createProd()
        res.status(200).json(newProds)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await prodsMongo.deleteProd(id)
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({ error })
    }
})
export default router
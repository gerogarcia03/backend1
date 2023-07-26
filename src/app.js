import express from 'express'
import productManger from './ProductManager.js'

const app = express()
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`escuchando el puerto en http://localhost:${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/productos', async (req, res) => {
    try {
        const prods = await productManger.getProducts()
        res.status(400).json(prods)
    } catch (error) {
        res.status(400).json({ error })
    }
}
)

app.get('/productos/:pid', async(req, res) => {
    try{
        const prods = await productManger.getProductsById(id)
        res.status(400).json(prods)
    } catch (error){
        res.status(400).json({error})
    }
})


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

    const { limit } = req.query

    try {
        const prods = await productManger.getProducts()

        if (limit) {
            res.json(prods.slice(0, limit))
        }
           res.json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
}
)

app.get('/productos/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const prods = await productManger.getProductsById(pid)
        res.json(prods)
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.get({

})


import express from 'express'
import productsRouter from './routes/prod.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()
const port = process.env.PORT || 8080;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productsRouter)
app.use('/api/cart', cartRouter)

app.listen(port, () => {
    console.log(`escuchando el puerto en http://localhost:${port}`)
})


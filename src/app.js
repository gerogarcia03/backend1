import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/prod.router.js'
import cartRouter from './routes/cart.router.js'
import { Server } from 'socket.io'
import productManager from './manager/ProductManager.js'
import './db/dbConfig.js'
import cartManager from './manager/CartManager.js'


//express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.engine('handlebars', handlebars.engine({ runtimeOptions: { allowProtoPropertiesByDefault: true } }))

//views
// app.use('/api/productos', productsRouter)
app.delete('/api/productos/:id', async (req, res) => {
  const deleteProduct = await productManager.deleteProduct(req.params.id)
  res.render('productos', { deleteProduct })
})
app.use('/api/productos/:id', async (req, res) => {
  const prods = await productManager.getProductById(req.params.id);
  res.render('productos', { prods: { payload: [prods] } })
})
app.post('/api/productos', async (req, res) => {
  const createProduct = await productManager.createProduct(req.body)
  res.render('productos', { createProduct })
})
app.use('/api/productos', async (req, res) => {
  const prods = await productManager.getProducts(req.query)
  res.render('productos', { prods })
})


app.delete('/api/cart/:id', async (req, res) => {
  const deleteCart = await cartManager.deleteCartProd(req.params.id)
  res.redner('cart', { deleteCart })
})
app.delete('/api/cart/:id/productos/:pid', async (req, res) => {
  const deleteCartProd = await cartManager.deleteCartProd(req.params.pid)
  res.render('cart ', { deleteCartProd })
})
app.use('/api/cart', async (req, res) => {
  const cart = await cartManager.getCartProd(req.query)
  res.render('cart', { cart })
})
app.get("/", (req, res) => {
  res.send('Bienvenidos!')
})


//socket
const port = process.env.PORT || 8080;

const httpServer = app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('cliente conectado');
  socket.on('disconnect', () => {
    console.log('cliente desconectado')
  })
})
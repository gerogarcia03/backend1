import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/prod.router.js'
import cartRouter from './routes/cart.router.js'
import { Server } from 'socket.io'
import productManager from './ProductManager.js'
import './db/dbConfig.js'
import cartManager from './CartManager.js'


//express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//views
// app.use('/api/productos', productsRouter)
app.use('/api/productos', async  (req, res) => {
  const prods = await productManager.findAll()
  res.render('productos', {prods})
})


app.use('/api/cart', cartRouter)
// app.use('/api/cart', async (req, res) => {
//   const cart = await cartManager.getCartProd() 
//   res.render('cart', {cart})
//   console.log(cart)
// })


app.get("/", (req, res) => {
  res.send('bienvenidos!')
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

  socket
  socket.on('addProd', (newProduct) => {
    const addedProd = productManager.addProduct(newProduct);
    socketServer.emit('addProd', addedProd)
  })


  socket.on('deleteProd', (prodsArray) => {
    productManager.deleteProduct(Number(prodsArray))
    socketServer.emit('prodcuto eliminado', prodsArray)
  })
})
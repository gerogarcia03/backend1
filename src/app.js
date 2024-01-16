import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import loginRouter from './routes/login.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import productManager from './manager/ProductManager.js'
import './db/dbConfig.js'
import cartManager from './manager/CartManager.js'
import FileStore from 'session-file-store'
import session from 'express-session'
import { usersManagers } from './manager/UsersManager.js'


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

//sessions
const filestore = FileStore(session)
app.use(session({
  store: new filestore({
    path: __dirname + '/sessions'
  }),
  secret: 'secretSession',
  cookie: { maxAge: 6000000 }
}))

//login views
app.use('/api/login', async (req, res)  => {
  const login = await usersManagers.createUser()
  res.render('login')
})
app.use('/api/signup', async (req, res) => {
  res.render('signup')
})

//prods views
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



//cart views
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
app.put('/api/cart/:id', async (req, res) => {
  const cart = await cartManager.updateProduct(req.params.id)
  res.render('cart', { cart })
})
app.put('/api/cart/:id/productos/:pid', async (req, res) => {
  const cart = await cartManager.updateProduct(req.params.pid)
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
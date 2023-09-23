import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/prod.router.js'
import cartRouter from './routes/cart.router.js'
import { Server } from 'socket.io'
import productManager from './ProductManager.js'
import './db/dbConfig.js'

const app = express()
const port = process.env.PORT || 8080;

const httpServer = app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('cliente conectado');
  socket.on('disconnect', ()=>{
    console.log('cliente desconectado')
  })  
})
/////////////////////////////////////////////////////////



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(express.static('./public'))
app.use('/api/productos', productsRouter)
app.use('/api/cart', cartRouter)


app.get("/", (req, res) => {
  res.send('holaa')
})

app.get('/home', async (req, res) => {
  let allProds = await productManager.getProducts()
  res.render('home', { allProds })
})

app.get('/realTimeProducts', async  (req, res) => {
  let allProds = await productManager.getProducts()
  res.render('realTimeProducts', {allProds})
})

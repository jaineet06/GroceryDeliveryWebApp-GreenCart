import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connnectDB.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoute.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.route.js'
import { stripeWebHooks } from './controllers/orderController.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//Allow Multiple Origins
const allowedOrigins = ['http://localhost:5173', 'https://greencart-wheat.vercel.app']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebHooks)


//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req, res) => {
    res.send("Api Working")
})
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
    console.log(`Server is serving on http://localhost:${port}`);
})
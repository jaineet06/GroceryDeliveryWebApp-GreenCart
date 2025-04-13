import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connnectDB.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()


//Allow Multiple Origins
const allowedOrigins = ['http://localhost:5173']


//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req, res) => {
    res.send("Api Working")
})
app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`Server is serving on http://localhost:${port}`);
    
})
import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js'
import authSeller from '../middlewares/authSeller.js'

const orderRouter = express.Router()

orderRouter.post('/cod', userAuth, placeOrderCOD)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.get('/user', userAuth, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)

export default orderRouter
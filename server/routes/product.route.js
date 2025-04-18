import express from 'express'
import { addProduct, changeStock, getAllProducts, productById } from '../controllers/productController.js'
import { upload } from '../middlewares/multer.js'
import authSeller from '../middlewares/authSeller.js'

const productRouter = express.Router()

productRouter.post('/add', upload.array('images', 4), authSeller, addProduct);
productRouter.get('/list', getAllProducts)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)

export default productRouter
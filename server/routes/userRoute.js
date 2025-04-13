import express from 'express'
import { isAuth, loginUser, logoutUser, registerUser } from '../controllers/userController.js'
import userAuth from '../middlewares/userAuth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/is-auth',userAuth, isAuth)
userRouter.get('/logout',userAuth, logoutUser)

export default userRouter
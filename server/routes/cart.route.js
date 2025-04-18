import express from "express";
import userAuth from "../middlewares/userAuth.js";
import updateCart from "../controllers/cartController.js";

const cartRouter = express.Router()

cartRouter.post('/update',  userAuth, updateCart)

export default cartRouter
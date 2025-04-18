import { v2 as cloudinary } from "cloudinary"
import Product from "../models/product.model.js"

const addProduct = async (req, res) => {

    try {

        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item, index) => {
                try {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: "image"
                    });
                    return result.secure_url;
                } catch (error) {
                    console.log(error);
                }

            })
        );


        await Product.create({ ...productData, image: imagesUrl })

        return res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }

}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

const productById = async (req, res) => {
    try {
        const { id } = req.body

        const product = await Product.findById(id)

        return res.json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body

        await Product.findByIdAndUpdate(id, { inStock })

        return res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

export { addProduct, getAllProducts, productById, changeStock }
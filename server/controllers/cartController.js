import User from "../models/user.js";

const updateCart = async (req, res) => {
    try {
        const {userId, cartItems} = req.body;
        

        await User.findByIdAndUpdate(userId, {cartItems})

        return res.json({success: true, message: "Cart Updated"})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

export default updateCart
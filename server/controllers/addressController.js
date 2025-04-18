import Address from "../models/address.model.js"

const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body
        await Address.create({ ...address, userId })

        return res.json({ success: true, message: "Address Added successfully" })

    } catch (error) {
        console.log(error.message);
        return res.json({ success: true, message: error.message })
    }
}

const getAddress = async (req, res) => {
    try {
        const { userId } = req.body

        const addresses = await Address.find({ userId })

        return res.json({ success: true, addresses })

    } catch (error) {
        console.log(error.message);
        return res.json({ success: true, message: error.message })
    }
}



export { addAddress, getAddress }
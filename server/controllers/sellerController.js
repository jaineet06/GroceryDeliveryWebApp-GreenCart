

const sellerLogin = async (req, res) => {

    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const sellerToken = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
                expiresIn: '7d'
            })

            res.cookie('token', token, {
                httpOnly: true, // prevent js to access cookie
                secure: false,
                sameSite: 'none', //CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.json({ success: true, message: "Logged In Succesfully" })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }

}

const isSellerAuth = async (res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message}) 
    }
}

const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        })

        return res.json({success: true, message: "Logged Out Succesfully"})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

export {sellerLogin, sellerLogout, isSellerAuth}
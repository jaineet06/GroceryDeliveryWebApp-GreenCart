import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.js";
import stripe from 'stripe'

const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Inavlid Data" });
        }

        let amount = 0

        for (const item of items) {
            const product = await Product.findById(item.product)
            amount += product.offerPrice * item.quantity
        }

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })

        return res.json({ success: true, message: "Order Placed Succesfully" })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, address } = req.body
        const { origin } = req.headers

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }

        let productData = []

        let amount = 0

        for (const item of items) {
            const product = await Product.findById(item.product)
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            amount += product.offerPrice * item.quantity
        }

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        })


        //Stripe getway intialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        //Create Line items
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        })

        //Create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),  
                userId
            }
        })
        
        return res.json({ success: true, message: "Order Placed Succesfully", url: session.url })


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//Stripe Weebhooks to verify Payments Action
const stripeWebHooks = async (req, res) => {

    //Stripe getway intialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

    const sig = req.headers["stripe-signature"]

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    //Handel the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { orderId, userId } = session.data[0].metadata

            //Mark payment as Paid
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            
            //Clear User cart
            await User.findByIdAndUpdate(userId, {cartItems: {}})
        }
        break;

        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { orderId, userId } = session.data[0].metadata
            await Order.findByIdAndDelete(orderId);

        }
        break;

        default:
            console.error(`Unhandled event type ${event.type}`)
        break;
    }
    res.json({received: true})
}



const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })

        return res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })
        return res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}





export { placeOrderCOD, getAllOrders, getUserOrders, placeOrderStripe, stripeWebHooks }
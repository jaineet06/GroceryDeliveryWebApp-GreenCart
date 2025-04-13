import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    cartItems: {type: Object, default: []}
}, {minimize: false})


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
            next()
        } catch (error) {
            console.log(error.message);
        }
})

const User = mongoose.models.user || mongoose.model('user', userSchema)
export default User
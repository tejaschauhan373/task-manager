const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ordered: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

mongoose.connect("mongodb://127.0.0.1:27017/shop", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
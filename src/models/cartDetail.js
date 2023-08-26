const mongoose = require('mongoose')

const cartDetailSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

mongoose.connect("mongodb://127.0.0.1:27017/shop", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const CartDetail = mongoose.model('CartDetail', cartDetailSchema)

module.exports = CartDetail
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

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
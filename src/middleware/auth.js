const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Cart = require("../models/cart");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'token')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        if(!req.cart){
            const cart = await Cart.findOne({ordered: false}, {}, { sort: { 'created_at' : -1 } })
            if(!cart) {
                const cart = new Cart({
                    owner: req.user._id,
                })
                await cart.save()
            }
            req.cart = cart; // get empty cart at entrance of mart
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
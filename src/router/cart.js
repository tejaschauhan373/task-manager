const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Cart = require('../models/cart')
const CartDetail = require('../models/cartDetail')
const Item = require('../models/item')

// To add item in cart
router.post('/cart/item', auth, async (req, res) => {
    const itemToBeAdded = await Item.findOne({_id: req.body.item})
    if (!itemToBeAdded) {
        return res.status(404).send("Couldn't find item in main menu!")
    }

    const filter = {
        item: req.body.item,
        cart: req.cart._id
    }
    const update = {
        quantity: req.body.quantity
    }
    const cartDetail = await CartDetail.findOneAndUpdate(
        filter,
        {
            $set: update
        },
        {upsert: true, new: true}
    )

    try {
        await cartDetail.save()
        res.status(201).send(cartDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

// To remove item from cart
router.delete('/cart/item', auth, async (req, res) => {
    try {
        let itemDetail;
        let filter = {
            cart: req.cart._id,
            item: req.body.item
        }
        let update = {
            quantity: req.body.quantity
        }
        if (req.body.quantity === 0) {
            itemDetail = await CartDetail
                .findOneAndDelete(filter)
        } else {
            itemDetail = await CartDetail
                .findOneAndUpdate(filter, update)
        }
        if (!itemDetail) {
            res.status(404).send("Item is not in the cart!")
        }
        res.send(itemDetail)
    } catch (e) {
        res.status(500).send(e)
    }
})

// To get cart details
router.get('/cart', auth, async (req, res) => {
    try {
        const itemRefs = await CartDetail.find({cart: req.cart._id}).populate("item").exec()
        const docs= Array.from(itemRefs.map(o => o.toObject()));
        let totalBill =  0;
        docs.forEach((item_lot) =>totalBill += item_lot.quantity*(item_lot.item.price + item_lot.item.tax))
        const obj = {
            "items" : itemRefs,
            "totalBill": totalBill
        }
        res.send(obj);
    } catch (e) {
        res.status(500).send(e)
    }
})

// To place order
router.post('/cart', auth, async (req, res) => {
    const cart = await Cart
        .findOne({_id: req.cart._id})
    cart.ordered = true
    const itemRefs = await CartDetail.find({cart: cart._id}).populate("item").exec()

    if (!itemRefs) {
        res.send("cart is empty!")
    }

    try {
        await cart.save()
        req.cart = null // give empty cart to mart official
        res.send(itemRefs)
    } catch (e) {
        res.status(400).send(e)
    }
})

// To clear cart
router.delete('/cart/:id', auth, async (req, res) => {
    try {
        let filter = {
            cart: req.params.id,
        }
        const summary = await CartDetail
            .deleteMany(filter)

        if (summary.deletedCount === 0) {
            res.status(404).send("Cart is already empty!")
        }
        res.send(items)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
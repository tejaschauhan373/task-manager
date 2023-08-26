const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Item = require('../models/item')


// To get all items
router.get('/items', auth, async (req, res) => {

    try {
        const items = await Item.find({})
        res.send(items)
    } catch (e) {
        res.status(500).send()
    }
})

// To add item in main menu
router.post('/item', auth, async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type
    })

    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

// To update item in main menu
router.patch('/item/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const item = await Item.findOne({_id: req.params.id})

        if (!item) {
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

// To delete item from main menu
router.delete('/item/:id', auth, async (req, res) => {
    try {
        const item = await Item.findOneAndDelete({_id: req.params.id})

        if (!item) {
            res.status(404).send()
        }

        res.send(item)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
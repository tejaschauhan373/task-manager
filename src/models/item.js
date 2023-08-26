const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        ref: 'User'
    },
    type:{
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

itemSchema.virtual('tax').get(function() {
    let tax = 0;
    if(this.type === "product"){
        if(this.price > 1000 && this.price < 5000){
            tax += this.price*0.12; //PA
        }else if(this.price > 5000) {
            tax += this.price * 0.18; //PB
        }
        tax += 200; //PC
    }else if(this.type === "service"){
        if(this.price > 1000 && this.price < 8000){
            tax += this.price*0.10;
        }else if(this.price > 8000) {
            tax += this.price * 0.15;
        }
        tax += 100; //SC
    }
    return tax;
});

mongoose.connect("mongodb://127.0.0.1:27017/shop", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
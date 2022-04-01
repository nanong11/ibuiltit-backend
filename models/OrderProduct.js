const { ObjectId } = require("bson")
const mongoose = require(`mongoose`)

const orderProductSchema = mongoose.Schema({
    orderId: {
        type: ObjectId,
        required: [true, `OrderId is required.`]
    },
    productId: {
        type: ObjectId,
        required: [true, `ProductId is required.`]
    },
    quantity: {
        type: Number,
        required: [true, `Quantity is required.`]
    },
    price: {
        type: Number,
        required: [true, `Price is required.`]
    },
    subTotal: {
        type: Number,
        required: [true, `Subtotal is required.`],
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model(`OrderProduct`, orderProductSchema)
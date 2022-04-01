const mongoose = require(`mongoose`)

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, `Name is required.`],
        unique: [true, `The Game Name must be unique.`]
    },
    description: {
        type: String,
        required: [true, `Description is required.`]
    },
    features: [
        {
            featuresName: {
                type: String
            },
            featuresDescription: {
                type: String
            }
        }
    ],
    category: {
        type: String,
        required: [true, `Category is required.`]
    },
    price: {
        type: Number,
        required: [true, `Price is required.`]
    },
    stock: {
        type: Number,
        required: [true, `Stock is required.`]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = mongoose.model(`Product`, productSchema)
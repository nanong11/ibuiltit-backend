const OrderProduct = require(`../models/OrderProduct`)
const Product = require(`../models/Product`)

// GET ALL ORDER PRODUCTS
module.exports.getAllOrderProducts = async () => {
    return await OrderProduct.find()
    .then(result => result ? result : error)}

// CREATE A ORDER
module.exports.createOrderProduct = async (reqBody) => {
    const {orderId, productId, quantity} = reqBody
    let price;
    await Product.findById(productId)
    .then(result => {
        if(result){
            return price = result.price
        }else{
            return error;
        }
    })
    let subTotal = quantity * price;
 
    const newOrderProduct = new OrderProduct({orderId, productId, quantity, price, subTotal})
    return newOrderProduct.save()
    .then(result => result ? result : error)
}

//FIND AN ORDER PRODUCT
module.exports.findOrderProduct = async (orderProductId) => {
    return await OrderProduct.findById(orderProductId)
    .then(result => result ? result : error)}

// ADD QUANTITY OF ORDER PRODUCT
module.exports.addQuantity = async (orderProductId) => {
    let subTotal;
    let quantity;
    await OrderProduct.findById(orderProductId)
    .then(result => {
        if(result){
            quantity = result.quantity + 1
            subTotal = quantity * result.price
        }else{
            return error
        }
    })
    return await OrderProduct.findByIdAndUpdate(orderProductId, { $set: { subTotal, quantity } })
    .then(result => result ? result : error)}

// DEDUCT QUANTITY OF ORDER PRODUCT
module.exports.deductQuantity = async (orderProductId) => {
    let subTotal;
    let quantity;
    await OrderProduct.findById(orderProductId)
    .then(result => {
        if(result){
            quantity = result.quantity - 1
            subTotal = quantity * result.price
        }else{
            return error
        }
    })
    return await OrderProduct.findByIdAndUpdate(orderProductId, { $set: { subTotal, quantity } })
    .then(result => result ? result : error)}

//DELETE ORDER
module.exports.deleteOrderProduct = async (orderProductId) => {
    return await OrderProduct.findByIdAndDelete(orderProductId)
    .then(result => result ? result : error)}
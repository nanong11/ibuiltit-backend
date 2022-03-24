const OrderProduct = require(`../models/OrderProduct`)
const Product = require(`../models/Product`)

// GET ALL ORDER PRODUCTS
module.exports.getAllOrderProducts = async () => {
    return await OrderProduct.find()
    .then(result => result ? result : error)}

// CREATE A ORDER
module.exports.createOrderProduct = async (reqBody) => {
    const {orderId, productId, quantity} = reqBody
    
    await Product.findById({productId})
    .then(result => {
        if(result){
            const price = result.price
            return price
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
    
    return await OrderProduct.findByIdAndUpdate({orderProductId}, { $inc: { quantity: 1 }, $set: { subTotal: { $mul: { price : quantity}}} })
    .then(result => result ? result : error)}

// DEDUCT QUANTITY OF ORDER PRODUCT
module.exports.deductQuantity = async (orderProductId) => {
    return await OrderProduct.findByIdAndUpdate({orderProductId}, { $inc: { quantity: -1 }, $set: { subTotal: { $mul: { price : quantity}}} })
    .then(result => result ? result : error)}

//DELETE ORDER
module.exports.deleteOrderProduct = async (orderProductId) => {
    return await OrderProduct.findByIdAndDelete(orderProductId)
    .then(result => result ? result : error)}
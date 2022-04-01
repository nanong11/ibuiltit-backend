const Order = require(`../models/Order`)

// GET ALL ORDERS
module.exports.getAllOrders = async () => {
    return await Order.find()
    .then(result => result ? result : error)}

// CREATE A ORDER
module.exports.createOrder = async (reqBody) => {
    const {userId, total} = reqBody
    const newOrder = new Order({userId, total})
    return newOrder.save()
    .then(result => result ? result : error)
}

//FIND AN ORDER
module.exports.findOrder = async (orderId) => {
    return await Order.findById(orderId)
    .then(result => result ? result : error)}

//COMPLETE A ORDER
module.exports.completeOrder = async (orderId) => {
    return await Order.findByIdAndUpdate(orderId, {$set: {complete: true}}, {new:true})
    .then(result => result ? result : error)}

//PENDING A ORDER
module.exports.pendingOrder = async (orderId) => {
    return await Order.findByIdAndUpdate(orderId, {$set: {complete: false}}, {new:true})
    .then(result => result ? result : error)}

//FIND ALL COMPLETE ORDER
module.exports.getAllCompleteOrders = async () => {
    return await Order.find({complete: true})
    .then(result => result ? result : error)}

//DELETE ORDER
module.exports.deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId)
    .then(result => result ? result : error)}
const CryptoJS = require(`crypto-js`)
const Product = require(`../models/Product`)

// GET ALL PRODUCTS
module.exports.getAllProducts = async () => {
    return await Product.find()
    .then(result => result ? result : error)}

// CREATE A PRODUCT
module.exports.createProduct = async (reqBody) => {
    const {productName, productImg, description, features, category, price, stock} = reqBody
    const newProduct = new Product({productName, productImg, description, features, category, price, stock})
    return await newProduct.save()
    .then(result => result ? result : error)}

//FIND A PRODUCT
module.exports.findProduct = async (productId) => {
    return await Product.findById(productId)
    .then(result => result ? result : error)}

//UPDATE A PRODUCT
module.exports.updateProduct = async (productId, reqBody) => {
    const {productName, description, features, category, price, stock, isActive} = reqBody
    const productData = {productName, description, features, category, price, stock, isActive}
    return await Product.findByIdAndUpdate(productId, {$set: productData}, {new:true})
    .then(result => result ? result : error)}

//ARCHIVE A PRODUCT
module.exports.archiveProduct = async (productId) => {
    return await Product.findByIdAndUpdate(productId, {$set: {isActive: false}}, {new:true})
    .then(result => result ? result : error)}

//UNARCHIVE A PRODUCT
module.exports.unArchiveProduct = async (productId) => {
    return await Product.findByIdAndUpdate(productId, {$set: {isActive: true}}, {new:true})
    .then(result => result ? result : error)}

//FIND ALL ACTIVE PRODUCTS
module.exports.getAllActiveProducts = async () => {
    return await Product.find({isActive: true})
    .then(result => result ? result : error)}

//DELETE PRODUCT
module.exports.deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId)
    .then(result => result ? result : error)}

// GET ALL PRODUCTS BY NAME
module.exports.getAllProductsByName = async (reqBody) => {
    return await Product.find({productName: {$in: reqBody}})
    .then(result => result ? result : error)}
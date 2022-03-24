const express = require(`express`)
const router = express.Router()
const productController = require(`../controllers/productControllers`)
const auth = require(`../middlewares/auth`)

// GET ALL PRODUCTS
router.get(`/`, auth.verify, async (req, res) => {
    try {
        await productController.getAllProducts().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A PRODUCT
router.post(`/create`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.createProduct(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A PRODUCT
router.post(`/:productId`, auth.verify, async (req, res) => {
    try {
        await productController.findProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A PRODUCT
router.put(`/:productId/update`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.updateProduct(req.params.productId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// ARCHIVE A PRODUCT
router.patch(`/:productId/archive`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.archiveProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UNARCHIVE A PRODUCT
router.patch(`/:productId/unArchive`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.unArchiveProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL ACTIVE PRODUCTS
router.get(`/isActive`, async (req, res) => {
    try {
        await productController.getAllActiveProducts().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE PRODUCT
router.delete(`/:productId/delete`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.deleteProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL PRODUCTS BY NAME
router.put(`/names`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await productController.getAllProductsByName(req.body.productName).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
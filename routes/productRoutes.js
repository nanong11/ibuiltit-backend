const express = require(`express`)
const router = express.Router()
const productController = require(`../controllers/productControllers`)
const auth = require(`../middlewares/auth`)

const { verify, verifyIfAdmin, decode } = auth
const {
    getAllProducts,
    createProduct,
    findProduct,
    updateProduct,
    archiveProduct,
    unArchiveProduct,
    getAllActiveProducts,
    deleteProduct,
    getAllProductsByName
} = productController

// GET ALL PRODUCTS
router.get(`/`, verify, async (req, res) => {
    try {
        await getAllProducts().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A PRODUCT
router.post(`/create`, verifyIfAdmin, async (req, res) => {
    try {
        await createProduct(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A PRODUCT
router.post(`/:productId`, async (req, res) => {
    try {
        await findProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A PRODUCT
router.put(`/:productId/update`, verifyIfAdmin, async (req, res) => {
    try {
        await updateProduct(req.params.productId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// ARCHIVE A PRODUCT
router.patch(`/:productId/archive`, verifyIfAdmin, async (req, res) => {
    try {
        await archiveProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UNARCHIVE A PRODUCT
router.patch(`/:productId/unArchive`, verifyIfAdmin, async (req, res) => {
    try {
        await unArchiveProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL ACTIVE PRODUCTS
router.get(`/isActive`, async (req, res) => {
    try {
        await getAllActiveProducts().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE PRODUCT
router.delete(`/:productId/delete`, verifyIfAdmin, async (req, res) => {
    try {
        await deleteProduct(req.params.productId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL PRODUCTS BY NAME
router.put(`/names`, verifyIfAdmin, async (req, res) => {
    try {
        await getAllProductsByName(req.body.productName).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
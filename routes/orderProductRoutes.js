const express = require(`express`)
const router = express.Router()
const orderProductController = require(`../controllers/orderProductControllers`)
const auth = require(`../middlewares/auth`)

const { verify, verifyIfAdmin } = auth
const { 
    getAllOrderProducts,
    createOrderProduct,
    findOrderProduct,
    deleteOrderProduct,
    addQuantity,
    deductQuantity
} = orderProductController

// GET ALL ORDER PRODUCTS
router.get(`/`, verify, async (req, res) => {
    try {
        await getAllOrderProducts().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A ORDER PRODUCT
router.post(`/create`, verify, async (req, res) => {
    try {
        await createOrderProduct(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A ORDER PRODUCT
router.post(`/:orderProductId`, verifyIfAdmin, async (req, res) => {
    try {
        await findOrderProduct(req.params.orderProductId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// ADD QUANTITY OF ORDER PRODUCT
router.put(`/:orderProductId/addQuantity`, verify, async (req, res) => {
    try {
        await addQuantity(req.params.orderProductId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DEDUCT QUANTITY OF ORDER PRODUCT
router.put(`/:orderProductId/deductQuantity`, verify, async (req, res) => {
    try {
        await deductQuantity(req.params.orderProductId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE ORDER PRODUCT
router.delete(`/: /delete`, verify, async (req, res) => {
    try {
        await deleteOrderProduct(req.params.orderProductId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
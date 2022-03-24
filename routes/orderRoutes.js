const express = require(`express`)
const router = express.Router()
const orderController = require(`../controllers/orderControllers`)
const auth = require(`../middlewares/auth`)

const { verify, verifyIfAdmin } = auth
const {
    getAllOrders,
    createOrder,
    findOrder,
    completeOrder,
    pendingOrder,
    getAllCompleteOrders,
    deleteOrder
} = orderController

// GET ALL ORDERS
router.get(`/`, verify, async (req, res) => {
    try {
        await getAllOrders().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A ORDER
router.post(`/create`, verify, async (req, res) => {
    try {
        await createOrder(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A ORDER
router.post(`/:orderId`, verifyIfAdmin, async (req, res) => {
    try {
        await findOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// COMPLETE A ORDER
router.patch(`/:orderId/complete`, verifyIfAdmin, async (req, res) => {
    try {
        await completeOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// PENDING A ORDER
router.patch(`/:orderId/pending`, verifyIfAdmin, async (req, res) => {
    try {
        await pendingOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL COMPLETE ORDER
router.get(`/isComplete`, verify, async (req, res) => {
    try {
        await getAllCompleteOrders().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE ORDER
router.delete(`/:orderId/delete`, verify, async (req, res) => {
    try {
        await deleteOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
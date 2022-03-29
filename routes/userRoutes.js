const express = require(`express`)
const router = express.Router()
const userController = require(`../controllers/userControllers`)
const auth = require(`../middlewares/auth`)

const { verify, verifyIfAdmin, decode } = auth
const { 
    getAllUsers, 
    getAllAdmins, 
    findUser, 
    signUp, 
    checkEmail, 
    login, 
    profile, 
    update, 
    updatePassword, 
    adminTrue, 
    adminFalse, 
    deleteUser
} = userController

//GET ALL USERS - received and return all users info or error
router.get(`/`, verifyIfAdmin, async (req, res) => {
    try {
        await getAllUsers().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL ADMIN
router.get(`/admins`, verifyIfAdmin, async (req, res) => {
    try {
        await getAllAdmins().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND USER BY ID
router.get(`/:userId`, verify, async (req, res) => {
    try {
        await findUser(req.params.userId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SIGN UP A USER - received and return result or error
router.post(`/signup`, async (req, res) => {
    try {
        await signUp(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//CHECK IF EMAIL EXIST - receive and return true or false
router.post(`/check-email`, async (req, res) => {
    try {
        await checkEmail(req.body.email).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN - receive and return a token or false or error
router.post(`/login`, async (req, res) => {
    try {
        await login(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//RETRIEVE USER INFORMATION - receive and return user info or error
router.get(`/profile`, verify, async (req, res) => {
    const userId = decode(req.headers.authorization).id
    try {
        await profile(userId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE USER INFORMATION - receive and return updated user info or error *password should have a dedicated update form*
router.put(`/update`, verify, async (req, res) => {
    const userId = decode(req.headers.authorization).id
    try {
        await update(userId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE PASSWORD OF A USER - receive and return updated password in hash or error
router.patch(`/update/password`, verify, async (req, res) => {
    const userId = decode(req.headers.authorization).id
    try {
        await updatePassword(userId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SET ISADMIN TO TRUE - return user info with isAdmin-true or false
router.patch(`/isAdmin`, verifyIfAdmin, async (req, res) => {
    try {
        await adminTrue(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SET ISADMIN TO FALSE - return user info with isAdmin-false or false
router.patch(`/isUser`, verifyIfAdmin, async (req, res) => {
    try {
        await adminFalse(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE USER - return true or false
router.delete(`/delete`, verifyIfAdmin, async (req, res) => {
    try {
        await deleteUser(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
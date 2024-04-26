const express = require('express')
const router = express.Router()
const { billUser,getBills,deleteBill } = require('../controllers/billControllers')
const {verifyToken} = require('../middlewares/authMiddleware')

router.post('/create-bill',verifyToken,billUser)
router.post('/all-bills/',verifyToken,getBills)
router.delete('/delete/:id',verifyToken,deleteBill)



module.exports = router


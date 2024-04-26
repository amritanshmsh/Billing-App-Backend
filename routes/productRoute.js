const express = require('express')
const router = express.Router();
const {addProduct, getAllProducts, editProductById, deleteProductById} = require('../controllers/productController')
const { verifyToken }  = require('../middlewares/authMiddleware')

router.post('/add-product',verifyToken,addProduct)
router.post('/get-products',verifyToken,getAllProducts)
router.patch('/edit-product/:id',verifyToken,editProductById)
router.delete('/delete-product/:id',verifyToken,deleteProductById)

module.exports = router
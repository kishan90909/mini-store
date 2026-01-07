const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Check if controller functions are loaded (Debug step)
if (!productController.getAllProducts || !productController.getProductById) {
    console.error("Error: productController functions are undefined. Check exports in productController.js");
}

// Define Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
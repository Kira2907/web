const path = require('path');

const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

const bodyParser = require('body-parser');
 
router.get("/products", productController.getProducts);
  
router.post("/products", bodyParser.json(), productController.addProducts);

router.delete("/products/:id", productController.deleteProduct);  
  
module.exports = router;  
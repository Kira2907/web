const Product = require('../models/user');

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  };

exports.addProducts = async (req, res) => {
    try {
      if (!req.body.price || !req.body.name) {
        throw new Error("Please fill the selling price/product field");
      }
      const product = new Product({
        price: req.body.price,
        name: req.body.name,
      });
      await product.save();
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  };
  
exports.deleteProduct = async (req, res) => {
    try {
      await Product.destroy({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  };  
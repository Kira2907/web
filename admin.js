const express= require("express");

const router= express.Router();

router.get('/add-product', (req,res,next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><br><input type="text" name="size"> <button type="submit">ADD PRODUCT</form> ');
});

router.post('/add-product', (req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
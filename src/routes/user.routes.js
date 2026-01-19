
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const userCtrl = require("../controllers/user.controller");
const cartCtrl = require("../controllers/cart.controller");

// AUTH
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// CART
router.post("/getcart", auth, cartCtrl.getCart);
router.post("/addtocart", auth, cartCtrl.addToCart);
router.post("/removefromcart", auth, cartCtrl.removeFromCart);

module.exports = router;

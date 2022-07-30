const Router = require("express");
const router = new Router();
const authController = require("../controller/auth.controller");


router.post("/token", authController.token);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/auth", authController.renderAuth);


module.exports = router;
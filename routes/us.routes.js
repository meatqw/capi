const Router = require("express");
const router = new Router();
const usController = require("../controller/us.controller");

router.post("/us", usController.createUs);
router.get("/us", usController.getUs);
router.get("/us/:id", usController.getOneUs);
router.put("/us", usController.updateUs);
router.delete("/us/:id", usController.deleteUs);

module.exports = router;

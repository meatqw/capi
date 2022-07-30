const Router = require("express");
const router = new Router();
const weController = require("../controller/we.controller");

router.post("/we", weController.createWe);
router.get("/we", weController.getWe);
router.get("/we/:id", weController.getOneWe);
router.put("/we", weController.updateWe);
router.delete("/we/:id", weController.deleteWe);

module.exports = router;

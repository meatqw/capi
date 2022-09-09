const Router = require("express");
const router = new Router();
const ordersController = require("../controller/orders.controller");

router.post("/orders", ordersController.createOrders);
router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOneOrders);
router.put("/orders", ordersController.updateOrders);
router.delete("/orders/:id", ordersController.deleteOrders);

module.exports = router;

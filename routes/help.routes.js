const Router = require("express");
const router = new Router();
const helpController = require("../controller/help.controller");
const mailController = require("../controller/mail.controller");

// add application for help
router.post("/help", helpController.createAppHelp);

// get application for help
router.get("/help", helpController.getAppHelp);

// get one application for help
router.get("/help/:id", helpController.getOneAppHelp);

// update application for help
router.put("/help", helpController.updateAppHelp);

// delete application for help
router.delete("/help/:id", helpController.deleteAppHelp);

// // send message mail
// router.post("/help/send", mailController.SendMail);

module.exports = router;

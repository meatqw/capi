const Router = require("express");
const router = new Router();
const videoController = require("../controller/video.controller");

router.post("/video", videoController.createVideo);
router.get("/video", videoController.getVideo);
router.get("/video/:id", videoController.getOneVideo);
router.put("/video", videoController.updateVideo);
router.delete("/video/:id", videoController.deleteVideo);

module.exports = router;

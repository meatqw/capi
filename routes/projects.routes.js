const Router = require("express");
const router = new Router();
const projectsController = require("../controller/projects.controller");

router.post("/projects", projectsController.createProjects);
router.get("/projects", projectsController.getProjects);
router.get("/projects/:id", projectsController.getOneProjects);
router.put("/projects", projectsController.updateProjects);
router.delete("/projects/:id", projectsController.deleteProjects);
router.get("/project/:id", projectsController.projectGet);


module.exports = router;

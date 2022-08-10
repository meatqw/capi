const Router = require("express");
const router = new Router();
const indexController = require("../controller/index.controller");

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'somerandomaccesstoken';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.cookie;

    if (authHeader) {
        const token = authHeader.split('accessToken=')[1].split(';')[0];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

router.get("/newspage", authenticateJWT, indexController.renderNews);
router.get("/projectspage", authenticateJWT, indexController.renderProjects);
router.get("/uspage", authenticateJWT, indexController.renderUs);
router.get("/wepage", authenticateJWT, indexController.renderWe);
router.get("/help", authenticateJWT, indexController.renderHelp);


module.exports = router;
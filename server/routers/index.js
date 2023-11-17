const express = require("express");
const routerRoom = require("./routerRoom");
const routerAccomodation = require("./routerAccomodation");
const UserController = require("../controllers/userController");
const errorHandler = require("../middleware/errorHandler");
const authentication = require("../middleware/Authentication");
const AuthController = require("../controllers/authController");
// const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post("/google-login", AuthController.googleLogin);

router.use(authentication);
router.use("/rooms", routerRoom);
router.use("/accomodations", routerAccomodation);
router.use(errorHandler);

module.exports = router;

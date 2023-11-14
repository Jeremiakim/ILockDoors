const express = require("express");
const routerRoom = require("./routerRoom");
const routerAccomodation = require("./routerAccomodation");
const UserController = require("../controllers/userController");
const errorHandler = require("../middleware/errorHandler");
const authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/login", UserController.Login);
router.use(authentication);
router.post("/register", UserController.Register);
router.use("/rooms", routerRoom);
router.use("/accomodations", routerAccomodation);
router.use(errorHandler);

module.exports = router;

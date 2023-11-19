const express = require("express");
const routerRoom = require("./routerRoom");
const routerAccomodation = require("./routerAccomodation");
const UserController = require("../controllers/userController");
const errorHandler = require("../middleware/errorHandler");
const authentication = require("../middleware/authentication");
const AuthController = require("../controllers/authController");
const TransactionController = require("../controllers/transactionController");

const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post("/google-login", AuthController.googleLogin);
router.use(authentication);
router.use("/rooms", routerRoom);
router.post("/invoiceXendit/:roomId", TransactionController.invoiceXendit);
router.post("/invoiceXendit/paid", TransactionController.finishPayment);
router.use("/accomodations", routerAccomodation);
router.use(errorHandler);

module.exports = router;

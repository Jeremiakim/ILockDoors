const express = require("express");
const AccomodationController = require("../controllers/accomodationController");
const routerAccomodation = express.Router();

routerAccomodation.get("/", AccomodationController.readAccomodation);
routerAccomodation.get(
  "/:accomodationId",
  AccomodationController.readDetailAccomodation
);
routerAccomodation.post("/", AccomodationController.addAccomodation);
routerAccomodation.put(
  "/:accomodationId",
  AccomodationController.editAccomodation
);
routerAccomodation.delete(
  "/:accomodationId",
  AccomodationController.deleteAccomodation
);

module.exports = routerAccomodation;

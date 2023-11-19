const express = require("express");
const RoomController = require("../controllers/roomController");
const { authorization } = require("../middleware/authorization");
// const {} = require("../middleware/authorization");
const routerRoom = express.Router();

routerRoom.get("/", RoomController.readRooms);
routerRoom.get("/:roomId", RoomController.readDetailRoom);
routerRoom.post("/", RoomController.addRoom);
routerRoom.patch("/:roomId", authorization, RoomController.vacantRoom);
routerRoom.patch("/:roomId", authorization, RoomController.bookedRoom);
routerRoom.put("/:roomId", authorization, RoomController.editRoom);
routerRoom.delete("/:roomId", authorization, RoomController.deleteRoom);

module.exports = routerRoom;

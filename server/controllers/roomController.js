const { Op } = require("sequelize");
const { Room, Accomodation } = require("../models");

class RoomController {
  static async readRooms(req, res, next) {
    let { page, sort, filter, search, size } = req.query;
    const option = {
      include: Accomodation,
    };
    //search
    if (search) {
      option.where = {
        name: { [Op.iLike]: `%${search}%` },
      };
    }
    try {
      const rooms = await Room.findAll(option);
      //   console.log(rooms);
      res
        .status(200)
        .json({ message: "Success to read all Rooms", Rooms: rooms });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async readDetailRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      //   console.log(roomId);
      const room = await Room.findOne({
        include: Accomodation,
        where: {
          id: roomId,
        },
      });
      //   console.log(room);
      if (!room) {
        throw {
          name: "Not Found",
          message: "This Room does not exists",
        };
      }
      res.status(200).json({ message: `Success to read Room ${roomId}`, room });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addRoom(req, res, next) {
    try {
      // console.log(req.body);
      // console.log(req.infoUser.id);
      const {
        name,
        externalId,
        roomNumber,
        imgUrl,
        description,
        price,
        startDate,
        endDate,
        AccomodationId,
      } = req.body;

      const room = await Room.create({
        name,
        roomNumber,
        imgUrl,
        price,
        description,
        startDate,
        endDate,
        status: "vacant",
        externalId,
        UserId: req.infoUser.id,
        AccomodationId,
      });
      // console.log(room);
      res.status(201).json({ message: "Create Room Success", room });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async editRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      // console.log(req.infoUser.id, 76);
      const {
        name,
        externalId,
        roomNumber,
        imgUrl,
        description,
        price,
        startDate,
        endDate,
        AccomodationId,
      } = req.body;
      const findRoom = await Room.findByPk(roomId);
      // console.log(findRoom);
      if (!findRoom) {
        throw {
          name: "Not Found",
          message: "This room does not exists",
        };
      }
      const data = await Room.update(
        {
          name,
          roomNumber,
          imgUrl,
          price,
          description,
          startDate,
          endDate,
          externalId,
          UserId: req.infoUser.id,
          AccomodationId,
        },
        {
          where: {
            id: roomId,
          },
        }
      );
      // console.log(data);
      // console.log(findRoom);
      res.status(201).json({ message: "Updated Room Success", findRoom });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteRoom(req, res, next) {
    try {
      // console.log(req.params);
      const { roomId } = req.params;
      const findRoom = await Room.findByPk(roomId);
      if (!findRoom) {
        throw {
          name: "Not Found",
          message: "This room does not exists",
        };
      }
      await Room.destroy({
        where: {
          id: roomId,
        },
      });
      res.status(200).json({
        message: "Success to delete room",
        findRoom,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async vacantRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      const findRoom = await Room.findByPk(roomId);
      // console.log(findRoom);
      if (!findRoom) {
        throw {
          name: "Not Found",
          message: "This room does not exists",
        };
      }
      const room = await Room.update(
        {
          status: "booked",
        },
        {
          where: {
            id: roomId,
          },
        }
      );
      res.status(201).json({ message: "Booked", findRoom });

      // console.log(room);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async bookedRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      const findRoom = await Room.findByPk(roomId);
      if (!findRoom) {
        throw {
          name: "Not Found",
          message: "This room does not exists",
        };
      }
      const room = await Room.update(
        {
          status: "vacant",
        },
        {
          where: {
            id: roomId,
          },
        }
      );
      res.status(201).json({ message: "Vacant", findRoom });
      // console.log(room);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RoomController;

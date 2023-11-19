const { Op } = require("sequelize");
const { Accomodation, Room } = require("../models");

class AccomodationController {
  static async readAccomodation(req, res, next) {
    try {
      let { page, sort, filter, search, size } = req.query;
      const option = {
        include: Room,
      };
      //search
      if (search) {
        option.where = {
          city: { [Op.iLike]: `${search}` },
        };
      }

      const accomodations = await Accomodation.findAll(option);
      //   console.log(accomodations);
      res
        .status(200)
        .json({ message: "Success to read accomodation", accomodations });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async readDetailAccomodation(req, res, next) {
    try {
      //   console.log(req.params);
      const { accomodationId } = req.params;
      const accomodations = await Accomodation.findByPk(accomodationId);
      if (!accomodations) {
        throw {
          name: "Not Found",
          message: "This Accomodation does not exists",
        };
      }
      //   console.log(accomodations);
      res
        .status(200)
        .json({ message: "Success to read accomodation", accomodations });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addAccomodation(req, res, next) {
    try {
      //   console.log(req.body);
      const { name, city } = req.body;
      const accomodation = await Accomodation.create({
        name,
        city,
      });
      //   console.log(accomodation);
      res
        .status(201)
        .json({ message: "Success to Add accomodation", accomodation });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async editAccomodation(req, res, next) {
    try {
      const { accomodationId } = req.params;
      const { name, city } = req.body;
      const findAccomodation = await Accomodation.findByPk(accomodationId);
      if (!findAccomodation) {
        throw {
          name: "Not Found",
          message: "This Accomodation does not exists",
        };
      }
      await Accomodation.update(
        {
          name,
          city,
        },
        {
          where: {
            id: accomodationId,
          },
        }
      );
      res
        .status(200)
        .json({ message: "Success to Update accomodation", findAccomodation });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteAccomodation(req, res, next) {
    try {
      const { accomodationId } = req.params;
      const findAccomodation = await Accomodation.findByPk(accomodationId);
      if (!findAccomodation) {
        throw {
          name: "Not Found",
          message: "This Accomodation does not exists",
        };
      }
      await Accomodation.destroy({
        where: {
          id: accomodationId,
        },
      });
      res
        .status(200)
        .json({ message: "Success to Delete accomodation", findAccomodation });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AccomodationController;

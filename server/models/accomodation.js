"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accomodation.hasMany(models.Room, { foreignKey: "AccomodationId" });
    }
  }
  Accomodation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Cannot Be Null",
          },
          notEmpty: {
            msg: "Name Cannot Be Empty",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "City Cannot Be Null",
          },
          notEmpty: {
            msg: "City Cannot Be Empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Accomodation",
    }
  );
  return Accomodation;
};

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
      name: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Accomodation",
    }
  );
  return Accomodation;
};

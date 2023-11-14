'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    roomNumber: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    UserId: DataTypes.STRING,
    AccomodationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
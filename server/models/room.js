"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fStartDate() {
      return this.startDate.toISOString().split("T")[0];
    }
    get fEndDate() {
      return this.endDate.toISOString().split("T")[0];
    }
    static associate(models) {
      Room.belongsTo(models.User, { foreignKey: "UserId" });
      Room.belongsTo(models.Accomodation, { foreignKey: "AccomodationId" });
    }
  }

  Room.init(
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
      roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Room Number Cannot Be Null",
          },
          notEmpty: {
            msg: "Room Number Cannot Be Empty",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url Cannot Be Null",
          },
          notEmpty: {
            msg: "Image Url Cannot Be Empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price Cannot Be Null",
          },
          notEmpty: {
            msg: "Price Cannot Be Empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description Cannot Be Null",
          },
          notEmpty: {
            msg: "Description Cannot Be Empty",
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start date Cannot Be Null",
          },
          notEmpty: {
            msg: "Start date Cannot Be Empty",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End Date Cannot Be Null",
          },
          notEmpty: {
            msg: "End Date Cannot Be Empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status Cannot Be Null",
          },
          notEmpty: {
            msg: "Status Cannot Be Empty",
          },
        },
      },
      externalId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "External id Cannot Be Null",
          },
          notEmpty: {
            msg: "External id Cannot Be Empty",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      AccomodationId: {
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
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  Room.beforeCreate(async (room, options) => {
    room.externalId = `A-${new Date().getTime()}`;
  });
  return Room;
};

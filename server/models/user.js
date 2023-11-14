"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Room, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      fullName: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email Cannot Be Null",
          },
          notEmpty: {
            msg: "Email Cannot Be Empty",
          },
          isEmail: {
            msg: "Email Must Be Unique",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Cannot Be Null",
          },
          notEmpty: {
            msg: "Password Cannot Be Empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role Cannot Be Null",
          },
          notEmpty: {
            msg: "Role Cannot Be Empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address Cannot Be Null",
          },
          notEmpty: {
            msg: "Address Cannot Be Empty",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone Number Cannot Be Null",
          },
          notEmpty: {
            msg: "Phone Number Cannot Be Empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    user.password = hashPassword(user.password);
  });
  return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      artwork.belongsTo(models.user);
      artwork.hasMany(models.bid);
    }
  }
  artwork.init(
    {
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hearts: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minimumBid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "artwork",
    }
  );
  return artwork;
};

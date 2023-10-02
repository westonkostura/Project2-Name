const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Map extends Model {}

Map.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        mapname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        markerdata: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
    {
        sequelize,
        timestamps: false,
        freezeTAbleName: true,
        underscored: true,
        modelName: 'map',
    }
);
module.exports = Map;
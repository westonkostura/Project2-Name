const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Map extends Model {}

Map.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            primaryKey: true,
            autoIncrement: true,
        },
        map_name: {
            type: DataTypes.STRING,
            allowNUll: false,
        },
        marker_id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            references: {
                model: 'marker',
                key: 'id',
            }
        }
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
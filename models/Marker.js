const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Marker extends Model {}


Marker.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNUll: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNUll: false,
            
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'marker',
    }
);
module.exports = Marker;


const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Marker extends Model {
    
    }


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
        Marker: {
            type: DataTypes.STRING,
            allowNUll: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTAbleName: true,
        underscored: true,
        modelName: 'marker',
    }
);
module.exports = Marker;


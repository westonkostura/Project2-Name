const User = require('./User');
const Marker = require('./Marker');
const Map = require('./Map');

User.hasMany(Marker, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Marker.belongsTo(User, {
    foreignKey: 'marker_id'
});

Map.belongsTo(User, {
    foreignKey: 'map_id'
})

module.exports = { User, Marker, Map }
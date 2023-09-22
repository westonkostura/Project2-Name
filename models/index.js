const User = require('./User');

const Marker = require('./Marker');

User.hasMany(Marker, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Marker.belongsTo(User, {
    foreignKey: 'userid'
});

module.exports = { User, Marker }
const User = require('./User');
const Map = require('./Map');

User.hasMany(Map, {
    foreignKey: 'user_id',
    
})
const sequelize = require('../config/connection');
const { Map, User } = require('../models');

const userData = require('./users.json');
const MapData = require('./mapdata.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const map of MapData) {
        await Map.create({
            ...map,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
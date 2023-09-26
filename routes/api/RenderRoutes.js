const router = require('express').Router();
const { Map, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/login', async (req, res) => {
    try {
        const MapData = await Map.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });
        const Maps = MapData.map((map) => map.get({ plain: true }));

        res.render('login', {
            Maps,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json({ message: 'login failed.'})
    }
});

router.get('/map/:id', async (req,res) => {
    try {
        const MapData = await Map.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });

        const map = MapData.get({ plain: true });

        res.render('dashboard', {
            ...map,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json({ message: 'get by id failed.'})
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Map }],
        });

        const user = userData.get ({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/login',)

module.exports = router;
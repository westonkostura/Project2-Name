const router = require('express').Router();
const { Marker, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log('works');
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});



// router.get('/map/:id', withAuth, async (req,res) => {
//     try {
//         const MapData = await Map.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['user_name'],
//                 },
//             ],
//         });

//         const map = MapData.get({ plain: true });

//         res.render('dashboard', {
//             ...map,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(400).json({ message: 'get by id failed.'})
//     }
// });

router.get('/dashboard', withAuth, async (req, res) => {
    console.log('works');
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Marker }],
        });

        const user = userData.get ({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/register',  async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    
    res.render('register')
});


module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');
const renderRoutes = require('./homeRoutes');

router.use('/', renderRoutes);
router.use('/api', apiRoutes);




module.exports = router;


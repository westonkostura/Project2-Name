const router = require('express').Router();

const mapRoutes = require('./Map-routes');
const markerRoutes = require('./Marker-routes');
const userRoutes = require('./User-routes');

router.use('/user', userRoutes);
router.use('/map', mapRoutes);
router.use('/marker', markerRoutes);

module.exports = router;
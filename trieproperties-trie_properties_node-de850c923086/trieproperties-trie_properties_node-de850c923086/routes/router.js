const express = require('express');
let router = express.Router();
const AdminRouter = require('./admin');
const AppRouter = require('./app');
const UploadRouter = require('./upload');
const CommonController = require('../controllers/CommonController');


//Admin Dashboard Api's
router.use('/admin', AdminRouter);

//app apis
router.use('/app', AppRouter);

//Upload Router
router.use('/upload', UploadRouter);

//Drop Total Database Except Admin
router.route('/Drop_All_Collections_Database').get(CommonController.Drop_All_Collections_Database);

module.exports = router;
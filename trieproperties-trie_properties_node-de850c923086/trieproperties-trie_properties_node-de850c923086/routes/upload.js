const express = require('express');
const AWSController = require('../controllers/AWSController');
const router = express.Router();


router.post('/Upload_Icon', AWSController.Upload_Icon);

router.post('/Upload_Image', AWSController.Upload_Image);

router.post('/Upload_Document', AWSController.Upload_Document);

router.post('/Supported_Video_Files', AWSController.Supported_Video_Files);

router.post('/Upload_Video', AWSController.Upload_Video_Without_Conversion);

router.post('/Supported_Audio_Files', AWSController.Supported_Audio_Files);

router.post('/Upload_Audio', AWSController.Upload_Audio);

router.post('/Upload_GIF', AWSController.Upload_GIF);

router.post('/Remove_Icon', AWSController.Remove_Icon);

router.post('/Remove_Image', AWSController.Remove_Image);

router.post('/Remove_Document', AWSController.Remove_Document);

router.post('/Remove_Video', AWSController.Remove_Video);

router.post('/Remove_Audio', AWSController.Remove_Audio);

router.post('/Remove_GIF', AWSController.Remove_GIF);

router.post('/Fetch_Icon_Complete_Information', AWSController.Fetch_Icon_Complete_Information);

router.post('/Fetch_Image_Complete_Information', AWSController.Fetch_Image_Complete_Information);

router.post('/Fetch_Document_Complete_Information', AWSController.Fetch_Document_Complete_Information);

router.post('/Fetch_Video_Complete_Information', AWSController.Fetch_Video_Complete_Information);

router.post('/Fetch_Audio_Complete_Information', AWSController.Fetch_Audio_Complete_Information);

router.post('/Fetch_GIF_Complete_Information', AWSController.Fetch_GIF_Complete_Information);

router.post('/Send_Recent_Images', AWSController.Send_Recent_Images);

module.exports = router;
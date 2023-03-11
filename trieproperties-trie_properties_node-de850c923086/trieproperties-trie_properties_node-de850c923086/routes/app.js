const express = require('express');
const DeviceMediator = require('../mediators/DeviceMediator');
const UserMediator = require('../mediators/UserMediator');

const router = express.Router();

//Splash Screen

router.route('/Generate_DeviceID').post(DeviceMediator.Generate_DeviceID);

router.route('/Splash_Screen').post(DeviceMediator.Splash_Screen);

//Blogs

router.route('/Filter_All_Blogs').post(UserMediator.Filter_All_Blogs);

router.route('/Fetch_Blog_Complete_Information').post(UserMediator.Fetch_Blog_Complete_Information);

//Projects

router.route('/Filter_All_Projects').post(UserMediator.Filter_All_Projects);

router.route('/Fetch_Project_Complete_Information').post(UserMediator.Fetch_Project_Complete_Information);

//contact form

router.route('/Submit_Contact_Form').post(UserMediator.Submit_Contact_Form);

router.route('/Submit_Book_A_Visit_Form').post(UserMediator.Submit_Book_A_Visit_Form);

//Contactus Info

router.route('/Fetch_Contact_Us_Info').post(UserMediator.Fetch_Contact_Us_Info);

//Banners

router.route('/Filter_All_Banners').post(UserMediator.Filter_All_Banners);

//Achievement and Rewards

router.route('/Filter_All_Achievements_and_Rewards').post(UserMediator.Filter_All_Achievements_and_Rewards);

router.route('/Fetch_Achievements_and_Rewards_Complete_Information').post(UserMediator.Fetch_Achievements_and_Rewards_Complete_Information);

//Why_Work_Withus

router.route('/Fetch_Why_Work_Withus_Info').post(UserMediator.Fetch_Why_Work_Withus_Info);

//Client Testimonials

router.route('/Fetch_Client_Testimonials').post(UserMediator.Fetch_Client_Testimonials);

//Home Projects

router.route('/Filter_All_Home_Project').post(UserMediator.Filter_All_Home_Project);


module.exports = router;
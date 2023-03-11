const { Router } = require('express');
const express = require('express');
const AdminMediator = require('../mediators/AdminMediator');

const router = express.Router();

//Admin

router.route('/Login').post(AdminMediator.Login);

router.route('/Common_Password_Validation').post(AdminMediator.Common_Password_Validation);

router.route('/Fetch_Admin_Complete_Information').post(AdminMediator.Fetch_Admin_Complete_Information);

router.route('/Create_Admin_User').post(AdminMediator.Create_Admin_User);

router.route('/Filter_All_Admin_Users').post(AdminMediator.Filter_All_Admin_Users);

router.route('/Update_Password').post(AdminMediator.Update_Password);

router.route('/Update_Admin_Password').post(AdminMediator.Update_Admin_Password);

router.route('/Update_Admin_Information').post(AdminMediator.Update_Admin_Information);

router.route('/Update_Information').post(AdminMediator.Update_Information);

router.route('/Inactivate_Admin').post(AdminMediator.Inactivate_Admin);

router.route('/Activate_Admin').post(AdminMediator.Activate_Admin);

router.route('/Logout').post(AdminMediator.Logout);

router.route('/Fetch_App_Versions_Settings').post(AdminMediator.Fetch_App_Versions_Settings);

router.route('/Update_App_Versions_Settings').post(AdminMediator.Update_App_Versions_Settings);

// Blogs

router.route('/Create_Blog').post(AdminMediator.Create_Blog);

router.route('/Update_Blog').post(AdminMediator.Update_Blog);

router.route('/Inactive_Blog').post(AdminMediator.Inactive_Blog);

router.route('/Active_Blog').post(AdminMediator.Active_Blog);

router.route('/Filter_All_Blogs').post(AdminMediator.Filter_All_Blogs);

// Projects

router.route('/Create_Project').post(AdminMediator.Create_Project);

router.route('/Update_Project').post(AdminMediator.Update_Project);

router.route('/Inactive_Project').post(AdminMediator.Inactive_Project);

router.route('/Active_Project').post(AdminMediator.Active_Project);

router.route('/Filter_All_Projects').post(AdminMediator.Filter_All_Projects);

// Contact_Forms

router.route('/Filter_All_Cotact_Forms').post(AdminMediator.Filter_All_Cotact_Forms);

// Book_A_Visit_Forms

router.route('/Filter_All_Book_A_Visit_Forms').post(AdminMediator.Filter_All_Book_A_Visit_Forms);

// Contact Information

router.route('/Update_Contact_Us_Info').post(AdminMediator.Update_Contact_Us_Info);

router.route('/Fetch_Contact_Us_Info').post(AdminMediator.Fetch_Contact_Us_Info);

// Why_Work_Withus

router.route('/Update_Why_Work_Withus_Info').post(AdminMediator.Update_Why_Work_Withus_Info);

router.route('/Fetch_Why_Work_Withus_Info').post(AdminMediator.Fetch_Why_Work_Withus_Info);

// Achievements and Rewards

router.route('/Create_Achievements_and_Rewards').post(AdminMediator.Create_Achievements_and_Rewards);

router.route('/Update_Achievements_and_Rewards').post(AdminMediator.Update_Achievements_and_Rewards);

router.route('/Inactive_Achievements_and_Rewards').post(AdminMediator.Inactive_Achievements_and_Rewards);

router.route('/Active_Achievements_and_Rewards').post(AdminMediator.Active_Achievements_and_Rewards);

router.route('/Filter_All_Achievements_and_Rewards').post(AdminMediator.Filter_All_Achievements_and_Rewards);

//Banners

router.route('/Create_Banner').post(AdminMediator.Create_Banner);

router.route('/Update_Banner').post(AdminMediator.Update_Banner);

router.route('/Active_Banner').post(AdminMediator.Active_Banner);

router.route('/Inactive_Banner').post(AdminMediator.Inactive_Banner);

router.route('/Filter_All_Banners').post(AdminMediator.Filter_All_Banners);

//Home Projects

router.route('/Add_Home_Project').post(AdminMediator.Add_Home_Project);

router.route('/Inactive_Home_Project').post(AdminMediator.Inactive_Home_Project);

router.route('/Active_Home_Project').post(AdminMediator.Active_Home_Project);

router.route('/Filter_All_Home_Project').post(AdminMediator.Filter_All_Home_Project);

//Client Testimonials

router.route('/Update_Client_Testimonials').post(AdminMediator.Update_Client_Testimonials);

router.route('/Fetch_Client_Testimonials').post(AdminMediator.Fetch_Client_Testimonials);





module.exports = router;
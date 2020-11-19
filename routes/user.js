const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");



router.post('/signup', validation.signUpValidationRules(), validation.validate,  userController.signUp);
router.post('/login', validation.loginValidationRules(), validation.validate, userController.logIn);
router.post('/resetpassword', auth.authorization("user","admin"), userController.resetPassword);
router.patch('/',  auth.authorization("user","admin"), userController.updateProfile)
router.get('/', auth.authorization("user","admin"), userController.getProfileData);


module.exports = router;
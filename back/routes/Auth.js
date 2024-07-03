const  express= require('express');
const router =express.Router();
const authcont= require('../controllers/authController');


router.post('/register',authcont.register)
router.post('/login',authcont.login)
router.post('/register-admin',authcont.registerAsAdmin)
//send reser email 
router.post('/send-email',authcont.sendEmail)
//reset pasword
router.post('/reset-password',authcont.resetPassword)

module.exports=router
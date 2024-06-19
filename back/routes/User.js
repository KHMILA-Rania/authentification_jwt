const express=require('express');
const router = express.Router();
const userCtrl=require('../controllers/userController');
const verifyT=require('../utils/verifyToken')
router.get('/all',verifyT.verifyAdmin ,userCtrl.getAllUsers);
router.get('/:id',verifyT.verifyUser,userCtrl.getUserById);
module.exports=router;
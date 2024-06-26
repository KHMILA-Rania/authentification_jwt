const express=require('express');
const router=express.Router();
const roleController=require('../controllers/roleController');
const  {verifyAdmin}=require('../utils/verifyToken');

router.post('/addRole',verifyAdmin,roleController.addRole);
router.get('/getRoles',verifyAdmin,roleController.getRoles);
router.delete('/deleteRole/:id',roleController.deleteRole);

router.patch('/updateRole/:id',roleController.updateRole);


module.exports=router;
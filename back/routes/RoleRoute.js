const express=require('express');
const router=express.Router();
const roleController=require('../controllers/roleController');

router.post('/addRole',roleController.addRole);
router.get('/getRoles',roleController.getRoles);
router.delete('/deleteRole/:id',roleController.deleteRole);

router.patch('/updateRole/:id',roleController.updateRole);


module.exports=router;
let express = require('express');
let userController = require('./controllers/userController');
let dressController = require('./controllers/dressController');
let categoryController = require('./controllers/categoryController');


let router = express.Router();

//send list of users
router.get('/users', userController.userList);
router.post('/user', userController.userNew);
//Send user
//router.get('/user/:i', userController.user);
//Update user
//router.put('/user/:i', userController.userUpdate);
// Delete user
//router.delete('/user/:i', userController.userDelete);

router.get('/dresses', dressController.dresses)
router.get('/dress/:iddress', dressController.getDressById);
router.post('/dress', dressController.addDress);
router.put('/dress/:iddress', dressController.updateDress);
router.delete('/dress/:iddress', dressController.deleteDress);
//router.get('/dress/name/:namedress', dressController.getDressByName);
//router.get('/dress/category/:categorydress', dressController.getDressByCategory);

router.get('/categories', categoryController.categories)
//router.get('/category/:idcategory', categoryController.getCategoryById);
router.post('/category', categoryController.addCategory);
router.put('/category/:idcategory', categoryController.updateCategory);
router.delete('/category/:idcategory', categoryController.deleteCategory);


module.exports = router;
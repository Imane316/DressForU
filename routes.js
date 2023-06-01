let express = require('express');
let userController = require('./controllers/userController');
let dressController = require('./controllers/dressController');
let categoryController = require('./controllers/categoryController');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 200;

function isAuthorized (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      // retrieve the authorization header and parse out the JWT using the split function
      let token = req.headers.authorization.split(" ")[1];
      // Here we validate that the JSON Web Token is valid
      jwt.verify(token, 'my_secret_key', (err, payload) => {
      if (err) {
      res.status(401).json({ error: "Not Authorized" });
      }
      req.user = payload; // allow to use the user id in the controller
      console.log(req.user);
      return next(); }); }
  }

let router = express.Router();

//send list of users
router.get('/users', userController.userList);
router.post('/user', userController.userNew);
router.post('/login', userController.login);

//Send user
//router.get('/user/:i', userController.user);
//Update user
//router.put('/user/:i', userController.userUpdate);
// Delete user
//router.delete('/user/:i', userController.userDelete);
router.post('/savedress', isAuthorized, dressController.SaveDress);
router.get('/dresses', dressController.dresses)
router.get('/dress/:iddress', dressController.getDressById);
router.post('/dress', dressController.addDress);
router.put('/dress/:iddress', dressController.updateDress);
router.delete('/dress/:iddress', dressController.deleteDress);

//router.get('/dress/name/:namedress', dressController.getDressByName);
//router.get('/dress/category/:categorydress', dressController.getDressByCategory);

router.get('/categories', categoryController.categories)
router.get('/category/:idcategory', categoryController.getCategoryById);
router.post('/category', categoryController.addCategory);
router.put('/category/:idcategory', categoryController.updateCategory);
router.delete('/category/:idcategory', categoryController.deleteCategory);
router.post('/categories/:idcategory/dresses/:iddress', dressController.addDressToCategory);
router.delete('/category/:idcategory/dress/:iddress', dressController.removeDressFromCategory);

module.exports = router;
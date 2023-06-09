let express = require('express');
let userController = require('./controllers/userController');
let dressController = require('./controllers/dressController');
let categoryController = require('./controllers/categoryController');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 200;
let router = express.Router();

function isAuthorized (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      // Récupération de l'en-tête d'autorisation et analyse du JWT à l'aide de la fonction split
      let token = req.headers.authorization.split(" ")[1];
      // Validation du jeton Web JSON 
      jwt.verify(token, 'my_secret_key', (err, payload) => {
      if (err) {
      res.status(401).json({ error: "Not Authorized" });
      }
      req.user = payload; // Utilisation de l'identifiant de l'utilisateur dans le contrôleur
      console.log(req.user);
      return next(); }); }
  }


router.get('/users', userController.userList);
router.post('/user', userController.userNew);
router.post('/login', userController.login);


//router.put('/user/:i', userController.userUpdate);
//router.delete('/user/:i', userController.userDelete);
router.post('/savedress', isAuthorized, dressController.SaveDress);
router.get('/dresses', dressController.dresses)
router.get('/dress/:iddress', dressController.getDressById);
router.post('/dress', dressController.addDress);
router.put('/dress/:iddress', dressController.updateDress);
router.delete('/dress/:iddress', dressController.deleteDress);
router.get('/dress/name/:namedress', dressController.getDressByName);
//router.get('/dress/category/:categorydress', dressController.getDressByCategory);

router.get('/categories', categoryController.categories)
router.get('/category/:idcategory', categoryController.getCategoryById);
router.post('/category', categoryController.addCategory);
router.put('/category/:idcategory', categoryController.updateCategory);
router.delete('/category/:idcategory', categoryController.deleteCategory);
router.post('/categories/:idcategory/dresses/:iddress', dressController.addDressToCategory);
router.delete('/category/:idcategory/dress/:iddress', dressController.removeDressFromCategory);
router.get('/category/:idcategory/dresses', categoryController.getDressIdsByCategoryId);
module.exports = router;
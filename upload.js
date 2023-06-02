const multer = require('multer');
const path = require('path');

// Définis le stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Définis le dossier de destination des images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname); // Définis le nom de fichier unique avec extension
  }
});

// Crée l'objet multer avec la configuration du stockage
const upload = multer({ storage: storage });

module.exports = upload;

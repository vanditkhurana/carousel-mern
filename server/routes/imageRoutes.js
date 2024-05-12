const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const upload = multer({ dest: '../client/public/uploads/' });

router.get('/', imageController.getImages);
router.post('/', upload.single('image'), imageController.addImage);
router.put('/:id', imageController.updateImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;

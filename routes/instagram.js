const express = require("express");
const router = express.Router();
const multer = require("multer");
const instaController = require("../controller/instagram");
const auth = require("../middleware/auth");
const upload = multer({ dest: "uploads/" });

router.post('/', upload.single("image"),  instaController.createInstagram);
router.patch('/:instaId',  instaController.editInsta);
router.get('/',  instaController.getAllInsta);


module.exports = router;







module.exports = router;
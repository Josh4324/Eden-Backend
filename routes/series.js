const express = require("express");
const router = express.Router();
const multer = require("multer");
const seriesController = require("../controller/series");
const auth = require("../middleware/auth");
const upload = multer({ dest: "uploads/" });

router.post('/', upload.single("image"),  seriesController.createSeries);
router.patch('/:seriesId',  seriesController.editSeries);
router.get('/',  seriesController.getAllSeries);


module.exports = router;







module.exports = router;
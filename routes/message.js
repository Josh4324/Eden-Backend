const express = require("express");
const router = express.Router();
const multer = require("multer");
const messageController = require("../controller/message");
const auth = require("../middleware/auth");
const upload = multer({ dest: "uploads/" });

router.post('/', upload.single("image"),  messageController.createMessage);
router.patch('/:messageId',  messageController.editMessage);
router.get('/:messageId',  messageController.getMessage);
router.get('/',  messageController.getAllMessage);


module.exports = router;







module.exports = router;
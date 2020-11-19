const Instagram = require('../model/instagram');
const cloudinary = require("cloudinary").v2;
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



exports.createInstagram = async (req, res) => {
    try {
    
        // create new Instagram Post
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                req.body.image = image;
                const newInsta = await Instagram.create(req.body);
                return successResMsg(res, 201, newInsta);
            }
        });
        
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.editInsta = async (req, res) => {
    try {
        // get insta id
        const id = req.params.instaId;
        // edit insta
        const insta = await Instagram.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return successResMsg(res, 200, "Insta post edited successfully");

    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getAllInsta = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({date: "desc"});
        return successResMsg(res, 200, messages);

    } catch (error) {
        return errorResMsg(res, 500, err);
    }
}


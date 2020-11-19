const Series = require('../model/series');
const jwt = require("jsonwebtoken");
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



exports.createSeries = async (req, res) => {
    try {
        // create new series
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                req.body.image = image;
                const newSeries = await Series.create(req.body);
                return successResMsg(res, 201, newSeries);
            }
        });
        
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.editSeries = async (req, res) => {
    try {
        // get series id
        const id = req.params.seriesId;
        // edit series
        const series = await Series.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        return successResMsg(res, 200, "series edited successfully");

    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}


exports.getAllSeries = async (req, res) => {
    try {
        const series = await Series.find({}).populate('messages');
        return successResMsg(res, 200, series);

    } catch (error) {
        return errorResMsg(res, 500, err);
    }
}
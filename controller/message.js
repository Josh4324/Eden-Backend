const Message = require('../model/message');
const Series = require('../model/series');
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



exports.createMessage = async (req, res) => {
    try {
        const checkSeries = await Series.find({name:  req.body.series});
        if (checkSeries.length === 0){
            return errorResMsg(res, 500, "This series does not exist, please create the series before adding the message");
        }
        // create new message
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                req.body.image = image;
                const newMessage = await Message.create(req.body);
                const update = {
                    messages:newMessage._id
                }
                const seriesUpdate = await Series.findOneAndUpdate(
                    { name:  newMessage.series },
                    { $push: update },
                    {
                    new: true,
                    })
                return successResMsg(res, 201, newMessage);
            }
        });
        
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.editMessage = async (req, res) => {
    try {
        // get message id
        const id = req.params.messageId;
        // edit message
        const message = await Message.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return successResMsg(res, 200, "message edited successfully");

    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getMessage = async (req, res) => {
    try {

        // get message id
        const id = req.params.messageId;
        // get message with message id
        const message = await Message.find({
            _id: id
        }).populate("messageList");
        return successResMsg(res, 200, message);
    } catch (err) {
        return errorResMsg(res, 500, err);
    }
}

exports.getAllMessage = async (req, res) => {
    try {
        const query = req.query.time
        let result
        const messages = await Message.find({}).sort({date: "desc"});
        if (query === 'latest'){
            result = messages[0]
        }else{
            result = messages
        }
        return successResMsg(res, 200, result);

    } catch (error) {
        return errorResMsg(res, 500, err);
    }
}


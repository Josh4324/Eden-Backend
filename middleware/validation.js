const {
    body,
    param,
    validationResult
} = require('express-validator');

exports.signUpValidationRules = () => {
    return [
        // username must be an email
        body("firstName").notEmpty().isAlpha().trim().escape().withMessage("Please provide Your first name"),
        body("lastName").notEmpty().isAlpha().trim().escape().withMessage("Please provide Your last name"),
        body("phoneNumber").notEmpty().isNumeric().trim().escape().withMessage("Please provide Your phone number"),
        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().isLength({
            min: 8
        }).withMessage("Password must have at least 8 characters"),
    ]
}

exports.loginValidationRules = () => {
    return [
        
        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is Required")
    ]
}

exports.messageValidationRules = () => {
    return [
        
        body("topic").notEmpty().withMessage("Topic is required"),
        body("preacher").notEmpty().withMessage("Preachers is required"),
        body("image").notEmpty().withMessage("Image is required"),
        body("audio").notEmpty().withMessage("Audio is required"),
        body("youtube").notEmpty().withMessage("Youtube is required"),
        body("summary").notEmpty().withMessage("Summary is required")
       
    ]
}



exports.validate = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({
            [err.param]: err.msg
        }))

        return res.status(422).json({
            errors: extractedErrors,
        })

    } catch {
        res.status(401).json({
            error: "Unauthorized",
            status: "error"
        })
    }
}
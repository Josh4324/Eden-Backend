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
        body("country").notEmpty().isAlpha().trim().escape().withMessage("Please provide the country"),
        body("state").notEmpty().isAlpha().trim().escape().withMessage("Please provide the state"),
        body("password").notEmpty().isLength({
            min: 5
        }).withMessage("Password must have at least 5 characters"),
    ]
}

exports.loginValidationRules = () => {
    return [
        
        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is Required")
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
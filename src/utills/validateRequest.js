const { sendErrorResponse } = require("./sendResponse");


function validateRequestBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errors = error.details.map((err) => err.message);
            sendErrorResponse(res, 400, errors, errors);
        } else {
            return next();
        }
    };
}

module.exports = validateRequestBody;

function sendSuccessResponse(res, statusCode, data, message) {
    res.status(statusCode).json({
        status: "success",
        message: message,
        result: data
    });
}

function sendErrorResponse(res, statusCode, message, error) {
    res.status(statusCode).json({
        status: "error",
        message: message,
        error: error
    });
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};
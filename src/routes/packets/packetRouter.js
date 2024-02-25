const { Router } = require('express');
const { postPvtPackets } = require("../../controllers/packet/packetsControllers");
const ErrorResponse = require("../../utills/errorResponse");
const { sendSuccessResponse, sendErrorResponse } = require("../../utills/sendResponse");
const { postPvtPacketSchema } = require('./requestValidator');
const validateRequestBody = require('../../utills/validateRequest');

const PacketsRouter = Router();

/**
 * @openapi
 * /pvt-service/api/pvt/add:
 *   post:
 *     summary: Identify the packets.
 *     description: Endpoint to identify the packets.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postData:
 *                 type: string
 *                 description: Enter the packet data.
 *     responses:
 *       '200':
 *         description: Successfully identified the packets.
 */

PacketsRouter.post("/add", validateRequestBody(postPvtPacketSchema), async (req, res, next) => {
    try {
        const result = await postPvtPackets(req.body);
        if(result==='no-data')
        sendErrorResponse(res,400,'Packet type not provided','Packet type not provided')
        else if(result==='Invalid-packet')
        sendErrorResponse(res, 400, 'Invalid Data', 'Failed');
        else
        sendSuccessResponse(res, 201,result, "Success");
    } catch (error) {
        let errors = JSON.parse(error?.message);
        if (errors?.status == "Failed") {
            next(new ErrorResponse(errors.message, errors.statusCode));
        }
        else {
            if (error instanceof Error)
                next(new ErrorResponse(JSON.stringify(error.message), 500));
        }
    }
})

module.exports = PacketsRouter;

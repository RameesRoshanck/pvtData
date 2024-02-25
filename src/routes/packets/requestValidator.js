const Joi = require('joi');

const postPvtPacketSchema = Joi.object({
    postData: Joi.string().required()
});

module.exports = { postPvtPacketSchema };
const { Router } = require("express");
const PacketsRouter = require("./packets/packetRouter");


const urlDirectory = [
    { prefix: "/api/pvt", router: PacketsRouter }
];

const registerRoutes = () => {
    const router = Router();
    urlDirectory.forEach((handler) => {
        router.use(handler.prefix, handler.router);
    });
    return router;
};

module.exports = {
    registerRoutes
};

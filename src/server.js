const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { registerRoutes } = require("./routes/index");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/pvt-service", registerRoutes());


//get all  files from routes folder
const routeFolder = "src/routes";
const getAllFiles= (dir) =>
    fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);


const files = getAllFiles(routeFolder);

//filter router files from all files
const routerFiles = files.filter((x) => {
    if (x.endsWith("Router.js")) return x;
});


// Define the port
const port = process.env.PORT || 8000;

//Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Service API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: "Development server",
            },
        ],
    },
    apis: routerFiles,
};

var options = {
    explorer: true,
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(
    "/pvt-service/api-docs", cors({
        origin: '*'
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, options)
);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}/`);
});



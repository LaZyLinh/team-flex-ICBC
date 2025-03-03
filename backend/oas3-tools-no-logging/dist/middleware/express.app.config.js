'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swagger_ui_1 = require("./swagger.ui");
const swagger_router_1 = require("./swagger.router");
const swagger_parameters_1 = require("./swagger.parameters");
const logger = require("morgan");
const fs = require("fs");
const jsyaml = require("js-yaml");
const express_openapi_validator_1 = require("express-openapi-validator");
class ExpressAppConfig {
    constructor(definitionPath, routingOptions) {
        this.definitionPath = definitionPath;
        this.routingOptions = routingOptions;
        this.app = express();
        const spec = fs.readFileSync(definitionPath, 'utf8');
        const swaggerDoc = jsyaml.safeLoad(spec);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        const swaggerUi = new swagger_ui_1.SwaggerUI(swaggerDoc, undefined);
        this.app.use(swaggerUi.serveStaticContent());
    }
    addValidator() {
        new express_openapi_validator_1.OpenApiValidator({
            apiSpec: this.definitionPath,
        })
            .install(this.app)
            .then(() => {
            this.app.use(new swagger_parameters_1.SwaggerParameters().checkParameters());
            this.app.use(new swagger_router_1.SwaggerRouter().initialize(this.routingOptions));
            this.app.use((err, req, res, next) => {
                // format errors
                res.status(err.status || 500).json({
                    message: err.message,
                    errors: err.errors,
                });
            });
        });
    }
    getApp() {
        return this.app;
    }
}
exports.ExpressAppConfig = ExpressAppConfig;
//# sourceMappingURL=express.app.config.js.map
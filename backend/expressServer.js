// const { Middleware } = require('swagger-express-middleware');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const openapiRouter = require('./utils/openapiRouter');
const admin = require('./admin/adminApp');
const auth = require('./auth/auth');
const logger = require('./logger');
const authenticator = require('./auth/authenticator');
const fileUpload = require('express-fileupload');
const AdminFloorService = require("./services/AdminFloorService");

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.schema = yamljs.load(openApiYaml);
    this.setupMiddleware();
  }

  setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static("public"));
    this.app.use(fileUpload());

    // TODO: authenticate admin
    // this.app.use("/admin", INSERT ADMIN MIDDLEWARE");
    this.app.post("/admin/upload-floorplan-image", AdminFloorService.uploadFloorPlan);
    this.app.post("/admin/upload-floor-data", AdminFloorService.uploadFloorData);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(authenticator.authenticate());
    this.app.use('/spec', express.static(path.join(__dirname, 'api')));
    this.app.get('/hello', (req, res) => res.send('Hello World. path: ' + this.openApiPath));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));
    this.app.use('/admin', admin);
    this.app.use('/auth', auth);
    this.app.get('/login-redirect', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    new OpenApiValidator({
      apiSpecPath: this.openApiPath,
    }).install(this.app);

    // Middleware for authenticating JWT for Azure AD

    this.app.use(openapiRouter());

  }

  addErrorHandler() {
    this.app.use('*', (req, res) => {
      res.status(404);
      res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
    });
    /**
     * suppressed eslint rule: The next variable is required here, even though it's not used.
     *
     ** */
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      const errorResponse = error.error || error.errors || error.message || 'Unknown error';
      res.status(error.status || 500);
      res.type('json');
      res.json({ error: errorResponse });
    });
  }

  async launch() {
    return new Promise(
      async (resolve, reject) => {
        try {
          this.addErrorHandler();
          this.server = await this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            resolve(this.server);
          });
        } catch (error) {
          reject(error);
        }
      },
    );
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;

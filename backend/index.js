const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const authenticator = require('./auth/authenticator')

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    await this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(error);
    await this.close();
  }
};

authenticator.getAndStoreMSADKey();

launchServer().catch(e => logger.error(e));

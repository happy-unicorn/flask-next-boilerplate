module.exports = {
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    backendAPI: `${process.env.BACKEND_ADDRESS}/api/${process.env.API_VERSION}`,
  }
};
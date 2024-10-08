function getEnvironmentURL (path = '') {
  let baseURL
  switch (process.env.EXECUTION_ENVIRONMENT) {
    case 'dev':
      baseURL = 'https://dev.albertinventdev.com/#/'
      break
    case 'sandbox':
      baseURL = 'https://sandbox.albertinvent.com/#/'
      break
    case 'staging':
      baseURL = 'https://staging.albertinventdev.com/#/'
      break
    case 'maya':
      baseURL = 'https://maya.albertinventdev.com/albert.html'
      break
    default:
      throw new Error(`Invalid EXECUTION_ENVIRONMENT: ${process.env.EXECUTION_ENVIRONMENT}. Supported environments are "dev", "sandbox", and "staging".`)
  }

  return baseURL + path
}

module.exports = { getEnvironmentURL }

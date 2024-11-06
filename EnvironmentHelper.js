function getEnvironmentURL (path = '') {
  let baseURL
  switch (process.env.EXECUTION_ENVIRONMENT) {
    case 'dev':
      baseURL = 'https://dev.albertinventdev.com/#'
      break
    case 'sandbox':
      baseURL = 'https://sandbox.albertinvent.com/#/'
      break
    case 'staging':
      baseURL = 'https://staging.albertinventdev.com/#'
      break
    case 'maya-dev':
      baseURL = 'https://maya.albertinventdev.com/#'
      break
    case 'maya-staging':
      baseURL = 'https://maya-staging.albertinventdev.com/#'
      break
    case 'local_server':
      baseURL = 'http://localhost:22500/#'
      break
    default:
      baseURL = 'https://dev.albertinventdev.com/#/'
      console.warn('Warning: Invalid or unset EXECUTION_ENVIRONMENT. Defaulting to "dev".')
  }

  return baseURL + path
}

module.exports = { getEnvironmentURL }

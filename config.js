require('dotenv').config()
const path = require('path')

const ENVIRONMENTS = {
  dev: 'https://dev.albertinventdev.com/#/',
  sandbox: 'https://sandbox.albertinvent.com/#/',
  staging: 'https://staging.albertinventdev.com/#/',
  maya: 'https://maya.albertinventdev.com/'
}

const getEnvironmentURL = (path = '') => {
  const baseURL = ENVIRONMENTS[process.env.EXECUTION_ENVIRONMENT] || ENVIRONMENTS.dev
  if (!ENVIRONMENTS[process.env.EXECUTION_ENVIRONMENT]) {
    console.warn('Warning: Invalid or unset EXECUTION_ENVIRONMENT. Defaulting to "dev".')
  }
  return baseURL + path
}

const config = {
  baseURL: getEnvironmentURL(),
  isCI: process.env.IS_CI === 'true',
  headless: process.env.HEADLESS_VIEWPORT === 'true',
  lighthouseValidations: process.env.LIGHTHOUSE_VALIDATIONS === 'true',
  sessionStatePath: path.resolve(__dirname, '../../out/loginSessionStorage.json')
}

module.exports = config

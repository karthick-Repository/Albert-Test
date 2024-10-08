/* eslint-disable no-dupe-class-members */
/* eslint-disable camelcase */
const { expect } = require('@playwright/test')
const { getEnvironmentURL } = require('../utilities/EnvironmentHelper')
const logger = require('./Logger')

class APIUtil {
  constructor (apiContext) {
    this.apiContext = apiContext
    const fetchedURL = getEnvironmentURL()
    const url = new URL(fetchedURL)
    this.envURL = url.origin + '/'
    this.headers = {
      'Content-Type': 'application/json',
      'x-albert-expires': 'true'
    }
  }

  /*
    Method to login to the application and fetch the jwtToken for the corresponding login.
    Login details are fetched from loginPayLoad json in the same file
    Returns a valid jwtToken
  */
  async getjwtToken () {
    try {
      const loginData = require('../data/loginData.json')
      const loginPayload = {
        email: loginData.email,
        authCode: loginData.authCode,
        tenantId: process.env.TENANT
      }

      const loginUrl = `${this.envURL}api/v3/login/`
      const loginResponse = await this.apiContext.post(loginUrl, {
        data: loginPayload
      })
      const jsonResponse = await loginResponse.json()
      const jwtToken = jsonResponse[0].jwt
      expect(loginResponse.ok()).toBeTruthy()
      return jwtToken
    } catch (error) {
      console.error('An error occurred in getjwtToken: ', error.message)
      throw error
    }
  }

  async enableWorkSheet (projectID, jwtToken) {
    try {
      logger.info(`Attempting to enable worksheet for ${projectID}`)
      const endPoint = `${this.envURL}api/v3/worksheet/${projectID}/setup`
      logger.info(`End point is ${endPoint}`)
      const header = { ...this.headers, Authorization: `Bearer ${jwtToken}` }
      const worksheetSetupResponse = await this.apiContext.post(endPoint, {
        headers: header
      })
      expect(worksheetSetupResponse.ok()).toBeTruthy()
      return await worksheetSetupResponse.json()
    } catch (error) {
      console.error('An error occurred in enableWorkSheet: ', error.message)
      throw error
    }
  }

  async deleteProject (projectID, jwtToken) {
    try {
      logger.info(`Attempting to delete project ${projectID}`)
      const endPoint = `${this.envURL}api/v3/projects/${projectID}`
      logger.info(`End point is ${endPoint}`)
      const header = { ...this.headers, Authorization: `Bearer ${jwtToken}` }
      const deleteProjectResponse = await this.apiContext.delete(endPoint, {
        headers: header
      })
      expect(deleteProjectResponse.ok()).toBeTruthy()
      logger.info(`Project ${projectID} deleted successfully`)
    } catch (error) {
      console.error('An error occurred in deleteProject: ', error.message)
      throw error
    }
  }

  async getAPI (endpoint, jwtToken) {
    try {
      logger.info('Inside GET API')
      const endPoint = `${this.envURL}${endpoint}`
      logger.info(`Endpoint is ${endPoint}`)
      const header = { ...this.headers, Authorization: `Bearer ${jwtToken}` }
      const getResponse = await this.apiContext.get(endPoint, {
        headers: header
      })
      expect(getResponse.ok()).toBeTruthy()
      return await getResponse.json()
    } catch (error) {
      console.error('An error occurred in getAPI: ', error.message)
      throw error
    }
  }

  async postAPI (endpoint, payload, jwtToken) {
    try {
      const endPoint = `${this.envURL}${endpoint}`
      logger.info(`Endpoint is ${endPoint}`)
      const header = {
        'Content-Type': 'application/json'
      }
      if (jwtToken) {
        header.Authorization = `Bearer ${jwtToken}`
      }
      const postResponse = await this.apiContext.post(endPoint, {
        data: payload,
        headers: header
      })
      expect(postResponse.ok()).toBeTruthy()
      return await postResponse.json()
    } catch (error) {
      console.error('An error occurred in postAPI: ', error.message)
      throw error
    }
  }

  async patchAPI (endpoint, payload, jwtToken) {
    try {
      logger.info('Inside patchAPI method')
      const endPoint = `${this.envURL}${endpoint}`
      logger.info(`Endpoint is ${endPoint}`)
      const header = {
        'Content-Type': 'application/json'
      }
      if (jwtToken) {
        header.Authorization = `Bearer ${jwtToken}`
      }
      const patchResponse = await this.apiContext.patch(endPoint, {
        data: payload,
        headers: header
      })
      expect(patchResponse.ok()).toBeTruthy()
    } catch (error) {
      console.error('An error occurred in patchAPI: ', error.message)
      throw error
    }
  }

  async deleteAPI (endpoint, jwtToken) {
    try {
      logger.info('Inside deleteAPI method')
      const endPoint = `${this.envURL}${endpoint}`
      logger.info(`Delete Endpoint is ${endPoint}`)
      const header = { ...this.headers, Authorization: `Bearer ${jwtToken}` }

      const deleteResponse = await this.apiContext.delete(endPoint, {
        headers: header
      })

      if (!deleteResponse.ok()) {
        const responseBody = await deleteResponse.text()
        throw new Error(
          `Failed to delete. Status: ${deleteResponse.status()}, Response: ${responseBody}`
        )
      }

      expect(deleteResponse.ok()).toBeTruthy()
    } catch (error) {
      console.error('An error occurred in deleteAPI: ', error.message)
      throw error
    }
  }

  async deleteWithPayloadAPI (endpoint, payload, jwtToken) {
    try {
      const endPoint = `${this.envURL}${endpoint}`
      logger.info(`Delete Endpoint is ${endPoint}`)
      const header = { ...this.headers, Authorization: `Bearer ${jwtToken}` }

      const deleteResponse = await this.apiContext.delete(endPoint, {
        data: payload,
        headers: header
      })

      if (!deleteResponse.ok()) {
        const responseBody = await deleteResponse.text()
        throw new Error(
          `Failed to delete. Status: ${deleteResponse.status()}, Response: ${responseBody}`
        )
      }

      expect(deleteResponse.ok()).toBeTruthy()
    } catch (error) {
      console.error('An error occurred in deleteWithPayloadAPI: ', error.message)
      throw error
    }
  }
}

module.exports = { APIUtil }

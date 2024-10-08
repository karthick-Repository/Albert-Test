const { When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../utilities/Logger')
const { expect } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When('I create {int} projects', async function (numberOfProjects) {
  this.allProjectsMap = []
  for (let i = 0; i < numberOfProjects; i++) {
    const response = await this.apiUtil.postAPI(
      'api/v3/projects',
      this.dataGenerator.generateProjectPayLoad(),
      await this.jwtToken
    )

    const responseMap = new Map()
    responseMap.set('albertId', response.albertId)
    responseMap.set('projectId', response.projectId)
    this.allProjectsMap.push(responseMap)
  }
})

When('I enable worksheet for the created projects', async function () {
  this.projectsWithDesignIDs = []
  for (const responseMap of this.allProjectsMap) {
    logger.info(`Enabling WKS for ${responseMap.get('albertId')}`)
    const response = await this.apiUtil.enableWorkSheet(
      responseMap.get('albertId'),
      await this.jwtToken
    )

    const productDesign = response.find(design => design.designType === 'products')
    const resultDesign = response.find(design => design.designType === 'results')
    const appDesign = response.find(design => design.designType === 'apps')

    this.projectsWithDesignIDs.push({
      productDesignID: productDesign ? productDesign.albertId : null,
      resultDesignID: resultDesign ? resultDesign.albertId : null,
      appDesignID: appDesign ? appDesign.albertId : null
    })
  }
})

When('User creates a project', async function () {
  this.response = await this.apiUtil.postAPI(
    'api/v3/projects',
    this.dataGenerator.generateProjectPayLoad(),
    await this.jwtToken
  )
  this.initialResponseMap.set('albertId', this.response.albertId)
  this.initialResponseMap.set('projectId', this.response.projectId)
})

When('User stores the details of the created project', async function () {
  const newResponseMap = new Map()
  newResponseMap.set('albertId', this.initialResponseMap.get('albertId'))
  newResponseMap.set('projectId', this.initialResponseMap.get('projectId'))
  this.allResponseMaps.push(newResponseMap)
})

Then('User enables worksheet for the created project', async function () {
  logger.info(`Enabling WKS for ${this.initialResponseMap.get('albertId')}`)
  const response = await this.apiUtil.enableWorkSheet(
    await this.initialResponseMap.get('albertId'),
    await this.jwtToken
  )
  const productDesign = response.find(design => design.designType === 'products')
  const resultDesign = response.find(design => design.designType === 'results')
  const appDesign = response.find(design => design.designType === 'apps')

  this.responseMap.set('albertId', this.response.albertId)
  this.responseMap.set('projectId', this.response.projectId)
  this.responseMap.set('productDesignID', productDesign ? productDesign.albertId : null)
  this.responseMap.set('resultDesignID', resultDesign ? resultDesign.albertId : null)
  this.responseMap.set('appDesignID', appDesign ? appDesign.albertId : null)
})

When('User navigates to the WKS', async function () {
  logger.info(`Navigating to WKS for the project ${this.responseMap.get('projectId')}`)
  await wksPage.gotoWorksheetpage(this.responseMap.get('projectId'))
  // await wksPage.reloadPage()
  await this.page.waitForLoadState('domcontentloaded')
  await wksPage.isInWKSPage()
})

When('User navigates to the WKS with ID {string}', async function (wksID) {
  await wksPage.gotoWorksheetpage(wksID)
})

When('I navigate to worksheet {int}', async function (workSheetIndex) {
  const wksDetails = this.allProjectsMap[workSheetIndex - 1]
  logger.info(`Navigating to WKS for the project ${wksDetails.get('projectId')}`)
  await wksPage.gotoWorksheetpage(wksDetails.get('projectId'))
  await wksPage.isInWKSPage()
})

When('User navigates to an existing worksheet to validate copy paste formula scenario', async function () {
  const projectID = process.env.COPY_PASTE_FORMULA_WKS
  await wksPage.gotoPage(`${wksPage.envURL}/${projectID}/worksheet/`)
  await this.page.waitForLoadState('domcontentloaded')
  await wksPage.reloadPage()
  await wksPage.waitForURL('**/worksheet/')
  await this.page.waitForLoadState('domcontentloaded')
  await wksPage.webElementHandler.waitForVisible(await wksPage.wksGrid)
})

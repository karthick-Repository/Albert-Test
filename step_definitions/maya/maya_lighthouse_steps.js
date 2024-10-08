const { Before, Then } = require('@cucumber/cucumber')
const { Lighthouse } = require('../../page_objects/Common/Lighthouse')

let lightHouse

Before(async function () {
  lightHouse = new Lighthouse()
})

Then('I run the light house tests for {string} url in the maya_urls.json', async function (urlToNavigateTo) {
  await lightHouse.runLightHouseTests(urlToNavigateTo)
})
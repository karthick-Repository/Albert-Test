const { When, Then, Before } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')
const logger = require('../../utilities/Logger')

let usersPage, splitEmailAddress
Before(async function () {
  usersPage = this.poManager.fetchUsersPage()
})

When('I navigate to the users page', async function () {
  await usersPage.gotoUsersPage()
})

Then('I am in the users page', async function () {
  await usersPage.isInUsersPage()
})

When(
  'I generate random user data in {string} with the role {string} and class {string}',
  async function (sbuData, usrRole, usrClass) {
    const loc =
      process.env.EXECUTION_ENVIRONMENT === 'dev'
        ? '(D123) Duesseldorf, Germany'
        : 'Location 1'
    this.randomUserData = {
      userName: faker.person.firstName(),
      email: faker.internet.email(),
      sbu: sbuData,
      userRole: usrRole,
      userClass: usrClass,
      location: loc
    }
    logger.info(
      `The user data generated is : ${JSON.stringify(this.randomUserData)}`
    )
  }
)

When('I create the user with the random data generated', async function () {
  await usersPage.createUser(this.randomUserData)
})

Then(
  'I fetch the Albert ID of the user created in the previous step using email ID',
  async function () {
    splitEmailAddress = this.randomUserData.email.split('@')
    const endPointToFetchUser = `api/v3/users/search?text=${splitEmailAddress[0]}%40${splitEmailAddress[1]}`
    await this.page.waitForTimeout(1000)
    const getResponse = await this.apiUtil.getAPI(
      endPointToFetchUser,
      await this.jwtToken
    )
    const user = await getResponse.Items.find(
      (item) => item.email === this.randomUserData.email
    )
    this.searchedUserID = user ? user.albertId : null
    logger.info(`The searched user ID is : ${this.searchedUserID}`)
    expect(this.searchedUserID).not.toBeNull()
  }
)

When('I delete the created user', async function () {
  const endPointToDeleteUser = `api/v3/users/${this.searchedUserID}`
  await this.apiUtil.deleteAPI(endPointToDeleteUser, await this.jwtToken)
})

Then(
  'I validate that the user ID I deleted now does not exist in the system',
  async function () {
    const endPointToGetUser = `api/v3/users/${this.searchedUserID}`
    const getResponse = await this.apiUtil.getAPI(
      endPointToGetUser,
      await this.jwtToken
    )
    expect(getResponse.Roles).toEqual([])
    expect(getResponse.status).toBe('inactive')
  }
)

When('I search for the created user in the users grid', async function () {
  await usersPage.searchForUser(this.randomUserData.email)
  await this.page.waitForTimeout(2000)
})

Then(
  'I validate that the user is displayed in row {int} users grid with the status {string}',
  async function (rowIndexToBuild, expectedStatus) {
    const actualUserDetails = await usersPage.buildActualUserObject(
      rowIndexToBuild - 1,
      expectedStatus
    )

    const expectedUserData = {
      name: this.randomUserData.userName,
      email: this.randomUserData.email,
      role: '',
      status: expectedStatus,
      location: '',
      lastLogin: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }

    if (expectedStatus === 'Has Site Access') {
      expectedUserData.role = this.randomUserData.userRole
      expectedUserData.location = this.randomUserData.location
    }
    logger.info(`The expected user details are : ${JSON.stringify(expectedUserData)}`)
    expect(actualUserDetails).toMatchObject(expectedUserData)
  }
)

When('I remove the default filter applied in the grid', async function () {
  await usersPage.clickOnElement(await usersPage.defaultFilterSelectedCloseIcon)
})

const { expect } = require('@playwright/test')
const { getEnvironmentURL } = require('../../utilities/EnvironmentHelper')
const { WebElementHandler } = require('../../utilities/WebElementHandler')
const { BasePage } = require('./BasePage')
const twoFactorAuth = require('node-2fa')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })

class LoginPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.secretsManager = new AWS.SecretsManager()
    this.elementHandler = new WebElementHandler(this.page)
    this.envURL = getEnvironmentURL()
    this.signInText = page.getByText('Sign In')
    this.toAccessYourAccountText = page.getByText('to access your account')
    this.emailInput = page.locator("[formcontrolname='useremail']")
    this.nextButton = page.getByRole('button', { name: 'Next' })
    this.contactSupportLink = page.getByRole('link', {
      name: 'Contact Support'
    })
    this.authenticatorAppText = page.getByText('Authenticator App', {
      exact: true
    })
    this.passcodeInput = page.getByPlaceholder('Enter your code')
    this.mutedText = page.locator('.text-muted')
    this.backLink = page.getByRole('link', { name: 'Back' })
    this.enterYourCodeInput = page.locator('.animated-input input')
    this.signInWithSSOButton = page.locator(
      "[ng-click='loginWithAdfsAuthentication()']"
    )
    this.loginTitle = page.locator('.logintitle')
    this.nextInAuthenticate = page.locator('i').last()
  }

  /**
   * Retrieves a secret value from AWS Secrets Manager.
   * @returns {Promise<String>} The automation secret from the secret manager.
   */
  async getSecret () {
    let passCode = ''
    // Define the parameters for retrieving the secret value
    const params = {
      SecretId: process.env.EXECUTION_ENVIRONMENT
    }

    try {
      // Retrieve the secret value synchronously
      const data = await this.secretsManager.getSecretValue(params).promise()
      // Parse and output the secret value
      if ('SecretString' in data) {
        const secretValue = data.SecretString
        passCode = JSON.parse(secretValue).AUTOMATION_SECRET
      }
    } catch (err) {
      console.error('Error retrieving secret value:', err)
    }
    return passCode
  }

  /**
   * Navigates to the login page using the environment-specific URL.
   */
  async gotoLoginPage () {
    await this.page.goto(this.envURL, { timeout: 240 * 1000 })
    const loginTitle = await this.loginTitle
    await loginTitle.waitFor({ state: 'visible', timeout: 240 * 1000 })
    await expect(this.signInText).toBeVisible()
  }

  /**
   * Logs into the application using stored credentials.
   */
  async loginToTheApplication () {
    await this.enterEmailID()
    await this.clickNextButton()
    await this.page.waitForLoadState('networkidle')
    await this.enterPasscode()
    await this.clickNextArrow()
  }

  async validatePageTitle () {
    await expect(this.page).toHaveTitle('Login - Albert')
  }

  async validateLoginTitle () {
    await expect(this.signInText).toHaveCount(1)
  }

  async validateSubTitle () {
    await expect(this.toAccessYourAccountText).toHaveCount(1)
  }

  async validateEmailInput () {
    const loginInput = await this.elementHandler.waitForVisible(this.emailInput)
    expect(loginInput).toBeTruthy()
  }

  async chooseAccount () {
    const tenant = process.env.TENANT
    const env = process.env.EXECUTION_ENVIRONMENT
    if (env === 'dev') {
      if (tenant === 'TEN1') {
        await this.page.getByText('Albert Invent').click()
      }
    }
  }

  async validateNextButton () {
    await expect(this.nextButton).toBeVisible()
    await expect(this.nextButton).toHaveCount(1)
  }

  async validateContactSupportLink () {
    await expect(this.contactSupportLink).toBeVisible()
    await expect(this.contactSupportLink).toHaveCount(1)
  }

  /**
   * Validates major UI elements on the login page to ensure they are displayed.
   * @returns {Promise<Boolean>} True if all elements are validated, else false.
   */
  async validateLoginPageUIElements () {
    this.validatePageTitle()
    this.validateLoginTitle()
    this.validateSubTitle()
    this.validateEmailInput()
    this.validateNextButton()
    this.validateContactSupportLink()
    return true
  }

  /**
   * Fills in the user email ID in the email input field.
   */
  async enterEmailID () {
    await this.getSecret()
    const emailToType = await JSON.parse(
      JSON.stringify(require('../../data/loginData.json'))
    ).email
    await this.elementHandler.fillInputWithoutClear(await this.emailInput, emailToType)
  }

  /**
   * Clicks the 'Next' button on the login page.
   */
  async clickNextButton () {
    await this.nextButton.click()
  }

  /**
   * Validates the presence and count of the Authenticator App page.
   */
  async validateAuthenticatorApp () {
    await expect(this.authenticatorAppText).toBeVisible()
    await expect(this.authenticatorAppText).toHaveCount(1)
  }

  async validateMutedText () {
    expect(await this.mutedText.first().textContent()).toContain(
      'to access your account'
    )
    expect(await this.mutedText.nth(1).textContent()).toContain(
      'Lost your authenticator code? Resend Activation Email'
    )
    expect(await this.mutedText.nth(2).textContent()).toContain(
      'Lost your authenticator code? '
    )
    expect(await this.mutedText.nth(3).textContent()).toContain(
      'check your Authenticator app for the security code. If you are unable to use your Authenticator app, Please '
    )
    expect(await this.mutedText.nth(5).textContent()).toContain(
      'Lost your authenticator code?'
    )
    expect(await this.mutedText.last().textContent()).toContain(
      'Sign in automatically through your company’s authentication provider'
    )
  }

  async validateBackLink () {
    await expect(this.backLink).toBeVisible()
    await expect(this.backLink).toHaveCount(1)
  }

  async validateEnterYourInput () {
    await expect(this.enterYourCodeInput).toBeVisible()
    await expect(this.enterYourCodeInput).toHaveAttribute(
      'placeholder',
      'Enter your code'
    )
  }

  async validateSignInWithSSO () {
    await expect(this.signInWithSSOButton).toHaveText('Sign in with SSO')
  }

  async validateAuthenticatorAppUIElements () {
    await this.validateAuthenticatorApp()
    await this.validateMutedText()
    await this.validateBackLink()
    await this.validateEnterYourInput()
    await this.validateSignInWithSSO()
    return true
  }

  async fetchPassCode () {
    return twoFactorAuth.generateToken(await this.getSecret()).token
  }

  async enterPasscode () {
    const passCode = twoFactorAuth.generateToken(await this.getSecret()).token
    await this.webElementHandler.click(await this.passcodeInput.last())
    await this.webElementHandler.fillInputWithType(await this.passcodeInput.last(), passCode)
  }

  async clickNextArrow () {
    await this.webElementHandler.click(await await this.nextInAuthenticate)
  }
}

module.exports = { LoginPage }

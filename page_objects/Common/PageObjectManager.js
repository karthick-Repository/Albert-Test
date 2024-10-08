const { LoginPage } = require('./LoginPage')
const { LandingPage } = require('./LandingPage')
const { WorksheetPage } = require('../../page_objects/Worksheet/WorksheetPage')
const { InventoryPage } = require('../Inventory/InventoryPage')
const { ProjectPage } = require('../Projects/ProjectPage')
const { NotebookPage } = require('../Notebook/NotebookPage')
const { UsersPage } = require('../Users_Teams_Roles/UsersPage')
const { DataTemplatePage } = require('../Data_Template/DataTemplatePage')
const { Grids } = require('./Grids')
const { BasePage } = require('./BasePage')
const { ParameterGroupsPage } = require('../Parameter_Groups/ParameterGroupsPage')
const { TaskPage } = require('../Task/TaskPage')
const { TaskDetailsPage } = require('../Task/TaskDetailsPage')
const { Dialog } = require('./Dialog')

class PageObjectManager {
  constructor (page) {
    this.page = page
    this.basePage = new BasePage(this.page)
    this.loginPage = new LoginPage(this.page)
    this.landingPage = new LandingPage(this.page)
    this.worksheetPage = new WorksheetPage(this.page)
    this.inventoryPage = new InventoryPage(this.page)
    this.projectPage = new ProjectPage(this.page)
    this.notebookPage = new NotebookPage(this.page)
    this.usersPage = new UsersPage(this.page)
    this.dataTemplatePage = new DataTemplatePage(this.page)
    this.grids = new Grids(this.page)
    this.pgPage = new ParameterGroupsPage(this.page)
    this.taskPage = new TaskPage(this.page)
    this.taskDetailsPage = new TaskDetailsPage(this.page)
    this.dialog = new Dialog(this.page)
  }

  fetchBasePage () {
    return this.basePage
  }

  fetchLoginPage () {
    return this.loginPage
  }

  fetchLandingPage () {
    return this.landingPage
  }

  fetchWorksheetPage () {
    return this.worksheetPage
  }

  fetchInventoryPage () {
    return this.inventoryPage
  }

  fetchRawMaterialModule () {
    return this.rawMaterialModule
  }

  fetchConsumableModule () {
    return this.ConsumableModule
  }

  fetchEquipmentModule () {
    return this.EquipmentModule
  }

  fetchProjectPage () {
    return this.projectPage
  }

  fetchNotebookPage () {
    return this.notebookPage
  }

  fetchUsersPage () {
    return this.usersPage
  }

  fetchDataTemplatePage () {
    return this.dataTemplatePage
  }

  fetchGrids () {
    return this.fetchGrids
  }

  fetchParameterGroupsPage () {
    return this.pgPage
  }

  fetchTaskPage () {
    return this.taskPage
  }

  fetchTaskDetailsPage () {
    return this.taskDetailsPage
  }

  fetchDialog () {
    return this.dialog
  }
}

module.exports = { PageObjectManager }

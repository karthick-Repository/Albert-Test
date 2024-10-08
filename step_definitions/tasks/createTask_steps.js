const { CreateTask } = require('../../page_objects/Task/CreateTask')
const { Before, Given, When, Then } = require('@cucumber/cucumber')

let createTask

Before(async function () {
    createTask = new CreateTask(this.page)
})


Given('I navigate to the create task page', async () => {
    await createTask.gotoCreateTaskPage()
});

When('I select the inventory {string} and add lots', async(inventoryId) =>{
    await createTask.selectInventoryAndAddLots(inventoryId)
});

When('I select a data template', async () => {
    await createTask.addDataTemplate()
});



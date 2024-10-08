const { WebElementHandler } = require('./WebElementHandler');  // Assuming you need to interact with web elements generally

class FileUploadHandler {
  constructor(page) {
    this.page = page;
    this.webElementHandler = new WebElementHandler(page);
  }

  /**
   * Uploads a file to a file input element.
   * @param {string} selector - The selector for the file input element.
   * @param {string} filePath - The path to the file to be uploaded, relative to the project root or an absolute path.
   */
  async uploadFile(selector, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.webElementHandler.click(selector)
    ]);

    // Set the file to be uploaded
    await fileChooser.setFiles(filePath);
  }

  /**
   * Uploads multiple files to a file input element.
   * @param {string} selector - The selector for the file input element.
   * @param {string[]} filePaths - An array of paths to the files to be uploaded.
   */
  async uploadMultipleFiles(selector, filePaths) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.webElementHandler.click(selector)
    ]);

    // Set multiple files to be uploaded
    await fileChooser.setFiles(filePaths)
  }
}

module.exports = { FileUploadHandler }

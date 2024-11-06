const { WebElementHandler } = require('./WebElementHandler')
const fs = require('fs').promises
const mammoth = require('mammoth')
const pdfParse = require('pdf-parse')
const readability = require('node-readability')

class FileUploadHandler {
  constructor (page) {
    this.page = page
    this.webElementHandler = new WebElementHandler(page)
    this.folderPath = 'src/fixtures'
  }

  /**
   * Uploads a file to a file input element.
   * @param {string} selector - The selector for the file input element.
   * @param {string} filePath - The path to the file to be uploaded, relative to the project root or an absolute path.
   */
  async uploadFile (selector, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.webElementHandler.click(selector)
    ])

    // Set the file to be uploaded
    await fileChooser.setFiles(filePath)
  }

  /**
   * Uploads multiple files to a file input element.
   * @param {string} selector - The selector for the file input element.
   * @param {string[]} filePaths - An array of paths to the files to be uploaded.
   */
  async uploadMultipleFiles (selector, filePaths) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.webElementHandler.click(selector)
    ])

    // Set multiple files to be uploaded
    await fileChooser.setFiles(filePaths)
  }

  async readContentsOfTheFile (fileName, fileFormat) {
    const filePath = `${this.folderPath}/${fileName}.${fileFormat}`
    const fileBuffer = await fs.readFile(filePath)

    let extractedText = ''

    switch (fileFormat.toLowerCase()) {
      case 'docx': {
        const result = await mammoth.extractRawText({ buffer: fileBuffer })
        extractedText = result.value
        break
      }
      case 'pdf': {
        const pdfData = await pdfParse(fileBuffer)
        extractedText = pdfData.text
        break
      }
      case 'txt':
      case 'rtf': {
        extractedText = fileBuffer.toString('utf8')
        break
      }
      case 'html': {
        extractedText = await new Promise((resolve, reject) => {
          readability(filePath, (err, article) => {
            if (err) reject(err)
            resolve(article.textBody)
            article.close()
          })
        })
        break
      }
      default:
        throw new Error(`Unsupported file format: ${fileFormat}`)
    }

    return extractedText
  }
}

module.exports = { FileUploadHandler }

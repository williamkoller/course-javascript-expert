const { readFile } = require('fs/promises');
const { join } = require('path');
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
}
const { error } = require('./constants');

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);
    return content;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);
    return(await readFile(fileName)).toString('utf-8');
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    const isHeaderValid = header === options.fields.join(',');
    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MEESSAGE,
        valid: false
      }
    }

    const isContentLengthAccepted = (fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines)
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false 
      }
    }

    return { valid: true }
  }
}
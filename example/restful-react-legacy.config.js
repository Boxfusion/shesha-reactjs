const camelCase = require('camelcase');
const BASE_URL = 'https://testdsdnpobe.azurewebsites.net';

const ROOT_PATH = './src/api';
const fs = require('fs');

const API_LIST = ['PostalCode', 'Province', 'PostCodeTown'];

const onlyUpdateExisting = false;

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach((key) => {
    const camelCasedName = camelCase(key);

    const url = `${BASE_URL}/swagger/service:${key}/swagger.json`;
    const fileName = `${ROOT_PATH}/${camelCasedName}.tsx`;
    const apiName = `${camelCasedName}Api`;

    if (!onlyUpdateExisting || fs.existsSync(fileName)) {
      apiObj[apiName] = {
        output: fileName,
        url: url,
      };
    }
  });
  return apiObj;
}

module.exports = {
  // ...legacyApis,
  ...generateFetcher(),
};

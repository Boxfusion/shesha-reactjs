const camelCase = require('camelcase');
const BASE_URL = 'https://shesha-mmsample-backend-dev.azurewebsites.net';
const ROOT_PATH = './src/api';
const fs = require('fs');

const legacyApis = require('./restful-react-legacy.config');

const API_LIST = [
  'Account',
  'Applications',
  'Area',
  'AuthorizationSettings',
  'Autocomplete',
  'BulkSms',
  'CheckList',
  'CheckListItem',
  'Clickatell',
  'ConfigurableComponent',
  'DataTable',
  'DeviceForceUpdate',
  'DeviceRegistration',
  'EmailSender',
  'EntityHistory',
  'Firebase',
  'Form',
  'Framework',
  'GmaAreas',
  'GmaAutocomplete',
  'Ldap',
  'Maintenance',
  'Members',
  'MembershipRegistrationSettings',
  'Metadata',
  'MobileDevice',
  'NewDataTable',
  'NHibernate',
  'Note',
  'Notification',
  'NotificationMessage',
  'NotificationTemplate',
  'Otp',
  'OtpAuditItem',
  'Payments',
  'Person',
  'ProcessableEntity',
  'ProcessConfigurationDocumentTemplate',
  'PushNotifiers',
  'PushSettings',
  'ReferenceList',
  'ReferenceListItem',
  'ReportDesigner',
  'ReportingReport',
  'ReportingReportParameter',
  'Role',
  'ScheduledJob',
  'ScheduledJobExecution',
  'ScheduledJobTrigger',
  'Session',
  'ShaRole',
  'ShaRoleAppointedPerson',
  'ShaUserLoginAttempts',
  'SmsGateways',
  'SmsPortal',
  'SmsSettings',
  'StoredFile',
  'StoredFilter',
  'Tenant',
  'TokenAuth',
  'User',
  'Workflow',
  'WorkflowHighLevelAssignee',
  'Xml2Sms',
];

const onlyUpdateExisting = false;

function generateFetcher() {
  const apiObj = {};

  API_LIST.forEach((key) => {
    const camelCasedName = camelCase(key);

    const url = `${BASE_URL}/swagger/service:${key}/swagger.json`;
    //const url = `http://localhost:21021/swagger/service:${key}/swagger.json`;
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
  // ...legacyApis(),
  ...generateFetcher(),
};

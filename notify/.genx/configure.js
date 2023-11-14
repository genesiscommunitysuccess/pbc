const { resolve } = require('node:path');
const { addUIDependency, runPreRequisiteChecks } = require('./utils');
const checks = require('./checks');

module.exports = async (data, utils) => {
  const { editJSONFile } = utils;
  const json = editJSONFile(resolve(__dirname, './package.json'));
  data.notifyVersion = json.get('version');
  data.date = Date();
  /**
   * Run checks on project
   */
  runPreRequisiteChecks(data, checks, utils);
  /**
   * TODO: Sort out what can move to pbc repo in genesislcap, and if all these are required.
   * TODO: Version targeting.
   */
  if (data.addAlerts) {
    addUIDependency(data, utils, '@genesislcap/foundation-alerts', 'latest');
  }
  addUIDependency(data, utils, '@genesislcap/foundation-inbox', 'latest');
  addUIDependency(data, utils, '@genesislcap/foundation-notifications', 'latest');
  addUIDependency(data, utils, '@genesislcap/foundation-notification-dashboard', 'latest');
};

const { resolve } = require('node:path');
const { addUIDependency, addServerDependency, runPreRequisiteChecks } = require('./utils');
const checks = require('./checks');
const versions = require('./versions.json');

module.exports = async (data, utils) => {
  const { editJSONFile } = utils;
  const json = editJSONFile(resolve(__dirname, './package.json'));
  data.pbcVersion = json.get('version');
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
    addUIDependency(data, utils, '@genesislcap/foundation-alerts', versions.dependencies.foundationAlerts);
  }
  addUIDependency(data, utils, '@genesislcap/foundation-inbox', versions.dependencies.foundationInbox);
  addUIDependency(data, utils, '@genesislcap/foundation-notifications', versions.dependencies.foundationNotifications);
  addUIDependency(data, utils, '@genesislcap/pbc-notify', versions.dependencies.pbcNotify);

  addServerDependency(data, 'depId', versions.dependencies.serverDepId);
};

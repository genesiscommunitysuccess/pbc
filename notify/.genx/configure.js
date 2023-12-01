const { resolve } = require('node:path');
const { addUIDependency, addServerDependency, runPreRequisiteChecks, runAsync } = require('./utils');

const versions = require('./versions.json');

module.exports = async (data, utils) => {
  const { editJSONFile } = utils;
  const json = editJSONFile(resolve(__dirname, './package.json'));
  data.notifyVersion = json.get('version');
  data.date = Date();

  // Workaround for Genx not executing NPM install on add (only init)
  await runAsync(__dirname, 'npm install', { prefixCommandWithNode: false });

  /**
   * Run checks on project
   */
  const checks = require('./checks');
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
  addUIDependency(data, utils, '@genesislcap/foundation-notification-dashboard', versions.dependencies.foundationNotificationDashboard);

  addServerDependency(data, 'depId', versions.dependencies.serverDepId);
};

const { addUIDependency, runPreRequisiteChecks } = require('../../.utils/utils');
const checks = require('./checks');

module.exports = async (data, utils) => {
  /**
   * Run checks on project
   */
  runPreRequisiteChecks(data, checks);
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

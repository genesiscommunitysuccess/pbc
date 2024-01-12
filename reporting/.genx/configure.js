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

  addUIDependency(data, utils, '@genesislcap/pbc-reporting', versions.dependencies.pbcReporting);

  addServerDependency(data, 'depId', versions.dependencies.serverDepId);
};

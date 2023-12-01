const { readFileSync } = require('node:fs');
const { addServerDependency } = require('./server');
const { runAsync } = require('./child-process');
const semver  = require('semver');

const addUIDependency = ({ directory }, { editJSONFile }, name, version) => {
  // https://www.npmjs.com/package/edit-json-file
  const pkg = editJSONFile(`${directory}/client/package.json`, { autosave: true });
  pkg.set('dependencies', {
    ...pkg.get('dependencies'),
    [name]: version
  });
};

const loadPropertiesFile = (path) => {
  const contents = readFileSync(path, 'utf-8');
  return contents.split('\n')
    .filter(Boolean) // filter out blank lines
    .map(l => l.split('='))
    .reduce((acc, value) => {
      acc[value[0]] = value.slice(1).join('=');
      return acc;
    }, {});
}

const handleCheckStatus = (check, success, error) => {
  if (success) {
    console.log(`Pre-requisite check successful: ${check.name}`);
  } else {
    console.error(`Pre-requisite check failed: ${check.name}.`, error?.message);
  }

  if (!success) {
    process.exit(1);
  }
}

const runPreRequisiteChecks = (data, checks, utils) => checks.every(check => {
  let success = false;

  try {
    success = check.handler(data, utils);
  } catch (e) {
    handleCheckStatus(check, success, e);
  }

  handleCheckStatus(check, success);
  return success;
});

module.exports = {
  addUIDependency,
  loadPropertiesFile,
  runPreRequisiteChecks,
  semver,
  addServerDependency,
  runAsync,
};

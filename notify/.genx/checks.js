const { existsSync } = require('node:fs');
const { loadPropertiesFile, semver } = require('./utils');

module.exports = [
  {
    name: 'Client folder exists',
    handler: (data) => existsSync(`${data.directory}/client`)
  },
  {
    name: 'UI version is within range',
    handler: (data, { editJSONFile }) => {
      const json = editJSONFile(`${data.directory}/client/package.json`, { autosave: false });
      const fuiVersion = json.get('dependencies.@genesislcap/foundation-ui');
      if (!fuiVersion) {
        throw new Error(`'@genesislcap/foundation-ui' must exist in the target project's dependencies.`);
      }
      return semver.satisfies(fuiVersion, '14.x');
    }
  },
  {
    name: 'Server folder exists',
    handler: (data) => existsSync(`${data.directory}/server`)
  },
  {
    name: 'build.gradle.kts exists',
    handler: (data) => existsSync(`${data.directory}/build.gradle.kts`)
  },
  {
    name: 'dummy.kts does not exist',
    handler: (data) => !existsSync(`${data.directory}/dummy.kts`)
  },
  {
    name: 'GSF version is 6.7.0',
    handler: (data) => {
      const props = loadPropertiesFile(`${data.directory}/server/jvm/gradle.properties`);
      return props.genesisVersion === '6.7.0';
    }
  },
  {
    name: 'Application did not have potentially clashing add-on `some-clashing-seed` applied',
    handler: (data) => !(data.additions || []).find(a => a.name === 'some-clashing-seed')
  },
];

const { existsSync } = require('node:fs');
const { loadPropertiesFile, semver } = require('./utils');
const versions = require('./versions.json');

/**
 * TODO: Add check for clean working directory. Not sure the seeds are init'd with a git setup for tracking. 
 */
module.exports = [
  {
    name: 'Client folder exists',
    handler: (data) => existsSync(`${data.directory}/client`)
  },
  {
    name: 'UI version is within range',
    handler: (data, { editJSONFile }) => {
      const json = editJSONFile(`${data.directory}/client/package.json`);
      const fuiVersion = json.get('dependencies.@genesislcap/foundation-ui');
      if (!fuiVersion) {
        throw new Error(`'@genesislcap/foundation-ui' must exist in the target project's dependencies.`);
      }
      return semver.satisfies(fuiVersion, versions.prerequisites.foundationUI);
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
    name: 'GSF version is within range',
    handler: (data) => {
      const props = loadPropertiesFile(`${data.directory}/server/gradle.properties`);
      return semver.satisfies(props.genesisVersion, versions.prerequisites.gsf);
    }
  }
];

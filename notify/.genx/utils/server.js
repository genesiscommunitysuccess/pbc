const { readFileSync, writeFileSync } = require('fs');

const TYPE = {
  OTHER: 'OTHER',
  GENESIS_OPENING_BLOCK: 'GENESIS_OPENING_BLOCK',
  DEPENDENCIES_OPENING_BLOCK: 'DEPENDENCIES_OPENING_BLOCK',
  DEPENDENCY: 'DEPENDENCY'
};

const parseSettings = (contents) => {

  const REGEX = {
    GENESIS_OPENING_BLOCK: /\s*genesis\s*{\s*/,
    DEPENDENCIES_OPENING_BLOCK: /\s*dependencies\s*{\s*/,
    DEPENDENCY: /\s*dependency\(.*\)\s*/,
  }

  let insideGenesisBlock = false;
  let insertionIndex;

  const lines = contents.split('\n').map((raw, index) => {
    let type = TYPE.OTHER;
    let meta = {};
    if (raw.match(REGEX.GENESIS_OPENING_BLOCK)) {
      type = TYPE.DEPENDENCIES_OPENING_BLOCK;
      insideGenesisBlock = true;
    } else if (raw.match(REGEX.DEPENDENCIES_OPENING_BLOCK) && insideGenesisBlock) {
      type = TYPE.DEPENDENCIES_OPENING_BLOCK;
      if (!insertionIndex) {
        insertionIndex = index + 1;
      }
    } else if (raw.match(REGEX.DEPENDENCY)) {
      type = TYPE.DEPENDENCY;
      const dep = raw.split(':');
      if (dep.length > 1) {
        meta.dependency = dep[1];
        meta.dependencyVersionProperty = dep[2].split('"')[1];
      }
    }

    return {
      raw,
      type,
      meta
    }
  });

  return {
    lines,
    insertionIndex
  }
}

const parseProperties = (contents) => {
  let insertionIndex;

  const lines = contents.split('\n').map((raw, index) => {
    if (raw.includes('authVersion')) {
      insertionIndex = index + 1;
    }

    return {
      raw,
    }
  });

  return {
    lines,
    insertionIndex
  }
}

const insertIntoArray = (arr, item, index) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index)
];

const createDepNode = (id) => ({
  type: TYPE.DEPENDENCY,
  raw: '        dependency("global.genesis:' + id + ':${extra.properties["' + id + 'Version"]}")',
  meta: {
   dependency: id,
   dependencyVersionProperty: `${id}Version`
  }
});

const addDependencyToSettings = (contents, id) => {
  const {lines, insertionIndex} = parseSettings(contents);

  const dep = createDepNode(id);
  
  const linesUpdated = insertIntoArray(lines, dep, insertionIndex);
  const serialised = linesUpdated.map(l => l.raw).join("\n");
  
  return serialised;
};

const addDependencyToProperties = (contents, id, version) => {
  const {lines, insertionIndex} = parseProperties(contents);

  const dep = { raw: `${id}Version=${version}` };
  const linesUpdated = insertIntoArray(lines, dep, insertionIndex);
  const serialised = linesUpdated.map(l => l.raw).join("\n");
  
  return serialised;
};

const addServerDependency = ({ directory }, id, version) => {
  const settingsPath = `${directory}/server/settings.gradle.kts`;
  const settings = readFileSync(settingsPath, 'utf8');
  const updatedSettings = addDependencyToSettings(settings, id);
  writeFileSync(settingsPath, updatedSettings);

  const propertiesPath = `${directory}/server/gradle.properties`;
  const properties = readFileSync(propertiesPath, 'utf8');
  const updatedProperties = addDependencyToProperties(properties, id, version);
  writeFileSync(propertiesPath, updatedProperties);
}

module.exports = {
  addServerDependency
};

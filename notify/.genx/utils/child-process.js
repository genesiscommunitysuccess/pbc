const { spawn } = require('node:child_process');

const normaliseNPMCLI = (cli) => {
  if (cli.toLowerCase() === 'npm') {
    return process.platform.match(/^win/) ? 'npm.cmd' : 'npm';
  }
  return cli;
};

const runAsync = async (cwd, command, options = {}) => {
  const {
    exitOnError = true,
    prefixCommandWithNode = true,
    env = { ...process.env },
    nodeArgs = '',
    verbose = true,
  } = options;

  return new Promise((resolve, reject) => {
    const chunks = command.trim().split(' ');
    const fullCommand = prefixCommandWithNode
      ? `node ${nodeArgs} ${chunks.shift()}`
      : chunks.shift();
    const crossPlatformCommand = normaliseNPMCLI(fullCommand);
    const child = spawn(crossPlatformCommand, chunks, {
      cwd,
      stdio: verbose ? 'inherit' : 'ignore',
      env,
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        const err = new Error(`Unexpected error executing ${command}`);
        if (exitOnError) {
          console.error(err);
          return process.exit(code);
        }
        reject(err);
      }
    });
    child.on('error', (err) => {
      if (exitOnError) {
        console.error(err);
        return process.exit(1);
      }
      reject(err);
    });
  });
};


module.exports = {
  runAsync
}
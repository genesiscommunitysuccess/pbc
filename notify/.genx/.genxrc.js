module.exports = {
  details: () => ({
    nextStepsMessage: `
> Run \`sample command\` to get started.
> Followed by \`sample command 2\`
`
  }),
  prompts: () => require('./prompts'),
  configure: () => require('./configure'),
};

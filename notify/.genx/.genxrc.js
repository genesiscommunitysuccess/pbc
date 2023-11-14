module.exports = {
  details: () => ({
    nextStepsMessage: `
> Run \`sample command\` to get started.
> Followed by \`sample command 2\`
`
  }),
  prompts: () => () => {},
  configure: () => require('./configure'),
};

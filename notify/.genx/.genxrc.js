module.exports = {
  details: () => ({
    nextStepsMessage: `
Genesis Notify PBC has been added successfully 🎉

> Go into the (web) client directory with \`cd client\`

> Install the PBC dependencies with \`npm run bootstrap\`

> Start the development server with \`npm run dev\`
`
  }),
  prompts: () => require('./prompts'),
  configure: () => require('./configure'),
};

const prompts = async (inquirer, prevAns) => {
  const {
    addAlerts = prevAns.addAlerts,
  } = await inquirer.prompt([
    {
      name: 'addAlerts',
      type: 'confirm',
      message: 'Add Alerts',
      default: prevAns.addAlerts || true,
      when: prevAns.addAlerts === undefined,
    },
  ]);
  return {
    addAlerts,
  };
};

module.exports = async (inquirer, prevAns = {}) => await prompts(inquirer, prevAns);

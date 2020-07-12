export const makeServiceRecord = req => {
  const formatStrategicGoals = strategicGoalsArray =>
    strategicGoalsArray.map(strategicGoal => ({
      name: strategicGoal.name
    }));

  const serviceRecord = (req => ({
    name: req.body.name,
    serviceCategory: req.body.serviceCategory,
    strategicGoals: formatStrategicGoals(req.body.strategicGoals)
  }))(req);

  return Object.freeze(serviceRecord)
};


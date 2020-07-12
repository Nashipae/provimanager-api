export const makeIncidentRecord = req => {
  return Object.freeze({
    name: req.body.name,
    description: req.body.description
  });
};

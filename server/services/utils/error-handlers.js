export const checkServerError = (res, error) => {
  if (error) {
    res.status(500).send(error);
    return error;
  }
};



export const makeSupplierRecord = req => {
    return Object.freeze({
        contact: req.body.name,
        company: req.body.company,
        country: req.body.country,
        email: req.body.email,
        telephone: req.body.telephone,
        cell: req.body.cell,
        ruc: req.body.ruc,
        state: req.body.state
    });
  };
  
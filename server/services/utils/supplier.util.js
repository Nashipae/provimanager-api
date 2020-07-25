export const makeSupplierRecord = req => {
    return Object.freeze({
        contact: req.body.contact,
        company: req.body.company,
        country: req.body.country,
        email: req.body.email,
        telephone: req.body.telephone,
        cell: req.body.cell,
        ruc: req.body.ruc,
        state: req.body.state,
        web: req.body.web
    });
  };

  export const makeSupplierRecordFromObj = obj => {
    return Object.freeze({
        contact: obj.contact,
        company: obj.company,
        country: obj.country,
        email: obj.email,
        telephone: obj.telephone,
        cell: obj.cell,
        ruc: obj.ruc,
        state: obj.state,
        web: obj.web
    });
  };
  
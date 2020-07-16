export const makeContractRecord = req => {
  
    const formatAgreements = agreementArray =>
      agreementArray.map(agreement => ({
        name: agreement.name,
        description: agreement.description,
        minimum: agreement.minimum
      }));
  
    const contractRecord = (req => ({
      name: req.body.name,
      description: req.body.description,
      contract_file: req.body.contract_file,
      signature: req.body.signature,
      state: req.body.state,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      agreement_contracts: formatAgreements(req.body.agreement_contracts),
      percentage: req.body.percentage,
      in_charge_points: req.body.in_charge_points,
      quality_points: req.body.quality_points,
      contract_points: req.body.contract_points,
      supplier_points: req.body.supplier_points,
      _service: req.body.service_id,
      _provider: req.body.provider_id
    }))(req);
  
    return Object.freeze(contractRecord)
  };
  
  
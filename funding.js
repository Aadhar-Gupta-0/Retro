(function(root) {
'use strict';
const isAddress = value => typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
function validateFunding(data) {
  if (!data || typeof data !== 'object' || !data.drips || typeof data.drips !== 'object') throw new Error('Missing drips funding object');
  const rows=Object.entries(data.drips).map(([network, record])=>{
    if (!/^[a-z0-9-]{2,40}$/.test(network)) throw new Error('Invalid network name');
    if (!record || typeof record !== 'object' || Array.isArray(record) || !isAddress(record.ownedBy)) throw new Error('Invalid owner address for '+network);
    if (Object.keys(record).some(field => field !== 'ownedBy')) throw new Error('Unexpected funding metadata for '+network);
    return {network, owner: record.ownedBy};
  });
  if (!rows.length) throw new Error('No funding entries');
  return rows;
}
root.FundingInspector={isAddress, validateFunding};
if(typeof module !== 'undefined') module.exports=root.FundingInspector;
})(typeof globalThis !== 'undefined'?globalThis:this);
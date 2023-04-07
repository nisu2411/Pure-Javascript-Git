const NetworksList = require("../models/networksList");

async function prepareStartOffset(query, start, offset, limit) {
  let networks;
  let totalNetworksCount;
  
  switch (true) {
    case (!start && !offset && (Object.keys(query).length === 0)):
      networks = await NetworksList.find().limit(limit);
      break; 
    case ((start <= 0 || offset <= 0) && !(Object.keys(query).length === 0)):
      networks = await NetworksList.find(query);
      break; 
    case ((isNaN(start) || isNaN(offset)) && !(Object.keys(query).length === 0)):
        networks = await NetworksList.find(query);
        break; 
    case ((start <= 0 || offset <= 0)):
      networks = await NetworksList.find().limit(limit);
      break; 
    case (!start && !offset && !(Object.keys(query).length === 0)):
      networks = await NetworksList.find(query);
      break; 
    case (start && offset && !(Object.keys(query).length === 0)):
      networks = await NetworksList.find(query).skip(start - 1).limit(offset);
      break; 
    case (!start && !offset && (Object.keys(query).length === 0)):
      networks = await NetworksList.find().limit(limit);
      break; 
    case (start && offset && (Object.keys(query).length === 0)):
      networks = await NetworksList.find().skip(start - 1).limit(offset);
      break;
    case ((!start && !offset && query === '')):
      networks = await NetworksList.find().limit(limit);
      break;
    default:
      networks = await NetworksList.find().limit(limit);
  }

  totalNetworksCount = await NetworksList.countDocuments();

  return { networks, totalNetworksCount };
}

exports.prepareStartOffset = prepareStartOffset;

const NetworksList = require("../models/networksList");

async function prepareStartOffset(query, start, offset, limit) {
  let networks;
  let totalNetworksCount;
  let queryObject = query ? query : {};

  switch (true) {
    case (!start && !offset && Object.keys(queryObject).length === 0):
      networks = await NetworksList.find().limit(limit);
      break;
    case (start && offset && query):
      networks = await NetworksList.find(queryObject)
        .skip(start - 1)
        .limit(offset);
      break;
    case ((start <= 0 || offset <= 0) && Object.keys(queryObject).length !== 0):
    case (!start && !offset && query):
    case (!start && !offset && query === ''):
    case (start <= 0 || offset <= 0):
      networks = await NetworksList.find(queryObject);
      break;
    case (!start && !offset && !query):
    case (start && offset && !query):
    default:
      networks = await NetworksList.find().limit(limit);
      break;
  }

  totalNetworksCount = await NetworksList.countDocuments();

  return { networks, totalNetworksCount };
}

exports.prepareStartOffset = prepareStartOffset;

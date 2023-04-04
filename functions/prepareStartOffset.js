const NetworksList = require("../models/networksList");

async function prepareStartOffset(query, start, offset, limit) {
  let networks;
  let totalNetworksCount;

  if (start && offset) {
    networks = await NetworksList.find(query)
      .skip(start - 1)
      .limit(offset);
  } else {
    networks = await NetworksList.find(query).limit(limit);
  }

  totalNetworksCount = await NetworksList.countDocuments();

  return { networks, totalNetworksCount };
}

exports.prepareStartOffset = prepareStartOffset;

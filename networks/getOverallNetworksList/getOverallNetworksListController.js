const { prepareResponse } = require('./getOverallNetworksListValidator');
const {prepareSearchQuery} =require("../../functions/prepareSearchQuery");
const  {prepareStartOffset} =require("../../functions/prepareStartOffset")

exports.getOverAllNetworksList = async (req, res, next) => {
  const start = Number(req.query.start);
  const offset = Number(req.query.offset);
  const searchKey = req.query.searchKey || "";
  const defaultLimit = 10;

  const query = prepareSearchQuery(searchKey);

  const { networks, totalNetworksCount } = await prepareStartOffset(query,start,offset,defaultLimit);

  const response = prepareResponse(networks, totalNetworksCount);

  res.status(200).send(response);
};

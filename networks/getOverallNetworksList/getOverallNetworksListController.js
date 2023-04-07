const { prepareResponse } = require('./getOverallNetworksListValidator');
const {prepareSearchQuery} =require("../../functions/prepareSearchQuery");
const  {prepareStartOffset} =require("../../functions/prepareStartOffset")
const {getFromCache,setCache} = require("../../services/redisCaching")

exports.getOverAllNetworksList = async (req, res, next) => {
  const start = Number(req.query.start);
  const offset = Number(req.query.offset);
  const searchKey = req.query.searchKey || "";
  const defaultLimit = 10;
  const caching=req.query.caching;

  let cacheKey = `networks:start:${start}:offset:${offset}:searchKey:${searchKey}`;
  let cacheData = await getFromCache(cacheKey);

    if (cacheData && caching==='redis') {
      res.status(200).send(JSON.parse(cacheData).lean());
    }
    else{
    const query = prepareSearchQuery(searchKey);

    const { networks, totalNetworksCount } = await prepareStartOffset(query,start,offset,defaultLimit);
  
    const response = prepareResponse(networks, totalNetworksCount);
    await setCache(cacheKey, JSON.stringify(response).lean());
    res.status(200).send(response);
  }


};

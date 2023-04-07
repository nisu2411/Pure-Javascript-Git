const NetworksList = require("../../models/networksList");
const { myselfProfileViewUserAvailableNetworksValidator } = require("./myselfProfileViewUserAvailableNetworksValidatorCaching");
const { getFromCache, setCache } = require("../../services/redisCaching");

exports.myselfProfileViewUserAvailableNetworks = async (req, res) => {
  const userEmail = req.body.email;
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Please provide user email in the request body",
    });
  }

  const redisKey = `myselfProfileViewUserAvailableNetworksController:${userEmail}`;
  let cachedData;
  try {
    cachedData = await getFromCache(redisKey);
  } catch (error) {
    console.error(`Error reading from Redis cache: ${error}`);
  }

  if (cachedData !== null) {
    const parsedData = JSON.parse(cachedData);
    return res.json({
      success: true,
      message: "User Specific Network List Fetched successfully.",
      userSpecificNetworksCount: parsedData.userSpecificNetworksCount,
      totalNetworksCount: parsedData.totalNetworksCount,
      result: parsedData.result,
    });
  }

  try {
    const result = await myselfProfileViewUserAvailableNetworksValidator(userEmail);

    const dataToCache = {
        userSpecificNetworksCount:result.length,
        totalNetworksCount: await NetworksList.countDocuments(),
        result: result,
      };
      try {
        await setCache(redisKey, JSON.stringify(dataToCache));
      } catch (error) {
        console.error(`Error writing to Redis cache: ${error}`);
      }

    res.json({
      success: true,
      message: "Available Network List Fetched successfully.",
      userAvailableNetworksCount: result.length,
      totalNetworksCount: await NetworksList.countDocuments(),
      result: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

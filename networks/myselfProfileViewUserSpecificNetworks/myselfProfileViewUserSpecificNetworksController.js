const User = require("../../models/users");
const { myselfProfileViewUserSpecificNetworksValidator } = require("./myselfProfileViewUserSpecificNetworksValidator");
const { getFromCache, setCache } = require("../../services/redisCaching");

exports.myselfProfileViewUserSpecificNetworks = async (req, res) => {
  const userEmail = req.body.email;
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Please provide user email in the request body",
    });
  }

  const redisKey = `myselfProfileViewUserSpecificNetworks:${userEmail}`;
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
    const user = await User.findOne({ email: userEmail }, { networks: 1 });
    if (!user) {
      return res.json({
        success: true,
        message: "User not found",
        userSpecificNetworksCount: 0,
        totalNetworksCount: 0,
        result: [],
      });
    }

    const networks = user.networks.map((network) => network.networkId);

    const {
      userSpecificNetworksCount,
      totalNetworksCount,
      result,
    } = await myselfProfileViewUserSpecificNetworksValidator(networks);

    const dataToCache = {
      userSpecificNetworksCount,
      totalNetworksCount,
      result,
    };
    try {
      await setCache(redisKey, JSON.stringify(dataToCache), 60); // 60 seconds expiration time
    } catch (error) {
      console.error(`Error writing to Redis cache: ${error}`);
    }
    res.json({
      success: true,
      message: "User Specific Network List Fetched successfully.",
      userSpecificNetworksCount,
      totalNetworksCount,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

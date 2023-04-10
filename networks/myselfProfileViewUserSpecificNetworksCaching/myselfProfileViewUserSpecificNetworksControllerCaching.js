const User = require("../../models/users");
const { myselfProfileViewUserSpecificNetworksValidator } = require("./myselfProfileViewUserSpecificNetworksValidatorCaching");
const { getFromCache, setCache } = require("../../services/redisCaching");
const { validateUserEmail, validateParams } = require("../../functions/emailValidator");

exports.myselfProfileViewUserSpecificNetworks = async (req, res) => {
  const userEmail = req.body.email;
  const validationUserEmailError = await validateUserEmail(userEmail);
  if (validationUserEmailError) {
    return res.status(500).json(validationUserEmailError)
  }

  const validationParamError = await validateParams(req.body);
  if (validationParamError) {
    return res.status(500).json(validationParamError);
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
      await setCache(redisKey, JSON.stringify(dataToCache));
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

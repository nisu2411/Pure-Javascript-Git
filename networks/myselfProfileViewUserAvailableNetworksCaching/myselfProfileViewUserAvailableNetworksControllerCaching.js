const NetworksList = require("../../models/networksList");
const { myselfProfileViewUserAvailableNetworksValidator } = require("./myselfProfileViewUserAvailableNetworksValidatorCaching");
const { getFromCache, setCache } = require("../../services/redisCaching");
const { validateUserEmail, validateParams } = require("../../functions/emailValidator");

exports.myselfProfileViewUserAvailableNetworks = async (req, res) => {
  const userEmail = req.body.email;
  const validationUserEmailError = await validateUserEmail(userEmail);
  if (validationUserEmailError) {
    return res.status(500).json(validationUserEmailError)
  }

  const validationParamError = await validateParams(req.body);
  if (validationParamError) {
    return res.status(500).json(validationParamError);
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

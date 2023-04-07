const { adminAddSpecificNetworksToUsersValidator } = require('./adminAddSpecificNetworksToUsersValidatorCaching');
const {getFromCache,delCache} = require("../../services/redisCaching");

exports.adminAddSpecificNetworksToUsers = async (req, res) => {
  try {
    let numberOfNetworks = parseInt(req.query.numberOfNetworks);
    if (!numberOfNetworks || numberOfNetworks <= 0) {
      numberOfNetworks = 50; 
    }
    const userEmail = req.body.email;

    const result = await adminAddSpecificNetworksToUsersValidator(userEmail, numberOfNetworks);
    const redisKey = `myselfProfileViewUserSpecificNetworks:${userEmail}`;
    let cachedData;
    try {
      cachedData = await getFromCache(redisKey);
    } catch (error) {
      console.error(`Error reading from Redis cache: ${error}`);
    }
    if (cachedData) {
      await delCache(redisKey);
    }
    return res.status(result.success ? 200 : 500).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Failed to add networks to user.",
      result: [],
    });
  }
};

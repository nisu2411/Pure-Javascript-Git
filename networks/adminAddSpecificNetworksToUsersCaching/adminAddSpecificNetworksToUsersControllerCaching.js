const { adminAddSpecificNetworksToUsersValidator } = require('./adminAddSpecificNetworksToUsersValidatorCaching');
const {getFromCache,delCache,flushCache} = require("../../services/redisCaching");
const { validateUserEmail, validateParams } = require("../../functions/emailValidator");

exports.adminAddSpecificNetworksToUsers = async (req, res) => {
  try {
    let numberOfNetworks = parseInt(req.query.numberOfNetworks);
    if (!numberOfNetworks || numberOfNetworks <= 0) {
      numberOfNetworks = 50; 
    }
    const userEmail = req.body.email;
    const validationUserEmailError = await validateUserEmail(userEmail);
    if (validationUserEmailError) {
      return res.status(500).json(validationUserEmailError)
    }
  
    const validationParamError = await validateParams(req.body);
    if (validationParamError) {
      return res.status(500).json(validationParamError);
    }

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
    await flushCache();
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

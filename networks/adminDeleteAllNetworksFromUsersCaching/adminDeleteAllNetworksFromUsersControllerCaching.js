const { adminDeleteAllNetworksFromUsersValidator } = require("./adminDeleteAllNetworksFromUsersValidatorCaching");
const { getFromCache,delCache,flushCache} = require("../../services/redisCaching");
const { validateUserEmail, validateParams } = require("../../functions/emailValidator");

exports.adminDeleteAllNetworksFromUsers = async (req, res) => {
  const userEmail = req.body.email;
  const validationUserEmailError = await validateUserEmail(userEmail);
  if (validationUserEmailError) {
    return res.status(500).json(validationUserEmailError)
  }

  const validationParamError = await validateParams(req.body);
  if (validationParamError) {
    return res.status(500).json(validationParamError);
  }

  if (Object.keys(req.body).length !== 1) {
    return res.status(400).json({
      success: false,
      isAuth: true,
      errorCode: -1,
      message: "Invalid request body",
      result: [],
    });
  }

  const result = await adminDeleteAllNetworksFromUsersValidator(userEmail);

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
  res.status(result.success ? 200 : 500).json(result);
};

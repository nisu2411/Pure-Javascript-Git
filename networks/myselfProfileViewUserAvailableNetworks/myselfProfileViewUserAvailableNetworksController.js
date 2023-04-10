const NetworksList = require("../../models/networksList");
const { myselfProfileViewUserAvailableNetworksValidator } = require("./myselfProfileViewUserAvailableNetworksValidator");
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

  try {
    const result = await myselfProfileViewUserAvailableNetworksValidator(userEmail);
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

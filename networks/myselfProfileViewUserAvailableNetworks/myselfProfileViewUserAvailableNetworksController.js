const NetworksList = require("../../models/networksList");
const { myselfProfileViewUserAvailableNetworksValidator } = require("./myselfProfileViewUserAvailableNetworksValidator");


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

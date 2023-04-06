const NetworksList = require("../../models/networksList");
const User = require("../../models/users");

exports.myselfProfileViewUserSpecificNetworks = async (req, res, next) => {
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
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        isAuth: false,
        errorCode: -1,
        message: "User Email Not Found",
      });
    }

    const userSpecificNetworks = user.networks;
    const totalNetworksCountForSpecificUser = userSpecificNetworks.length;
    const totalNetworksCount=await NetworksList.countDocuments();

    if (totalNetworksCountForSpecificUser === 0) {
      return res.json({
        success: true,
        message: 'User has no networks',
        userSpecificNetworksCount: 0,
        totalNetworksCount: 0,
        result: [],
      });
    }

    const result = userSpecificNetworks.map(network => ({
      networkId: network.networkId.toString(),
      networkName: network.networkName,
      networkLogoURL: network.networkLogoURL,
      networkVerifiedStatus: network.networkVerifiedStatus,
    }));

    res.json({
      success: true,
      message: "User Specific Network List Fetched successfully.",
      userSpecificNetworksCount: totalNetworksCountForSpecificUser,  
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

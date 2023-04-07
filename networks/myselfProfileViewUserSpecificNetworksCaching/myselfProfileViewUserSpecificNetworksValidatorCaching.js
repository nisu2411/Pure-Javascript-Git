const NetworksList = require("../../models/networksList");

exports.myselfProfileViewUserSpecificNetworksValidator = async (networks) => {
  try {
    const networksDetails = await NetworksList.find({
      _id: { $in: networks },
    });

    if (networksDetails.length === 0) {
      return {
        userSpecificNetworksCount: 0,
        totalNetworksCount: await NetworksList.countDocuments(),
        result: [],
      };
    }

    const result = networksDetails.map((network) => ({
      networkId: network._id.toString(),
      networkName: network.networkName,
      networkLogoURL: network.networkLogoURL,
      networkVerifiedStatus: network.networkVerifiedStatus,
    }));

    return {
      userSpecificNetworksCount: result.length,
      totalNetworksCount: await NetworksList.countDocuments(),
      result,
    };
  } catch (err) {
    console.error(err);
    return {
      userSpecificNetworksCount: 0,
      totalNetworksCount: 0,
      result: [],
    };
  }
};

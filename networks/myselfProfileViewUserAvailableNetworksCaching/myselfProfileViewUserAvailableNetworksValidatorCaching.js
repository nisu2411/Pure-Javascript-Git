const NetworksList = require("../../models/networksList");
const User = require("../../models/users");

exports.myselfProfileViewUserAvailableNetworksValidator = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User Email Not Found");
  }

  const userNetworkIds = user.networks.map((network) => network.networkId.toString());

  const availableNetworks = await NetworksList.find({_id: {$nin: userNetworkIds}});

  const result = availableNetworks.map((network) => ({
      networkId: network._id.toString(),
      networkName: network.networkName,
      networkLogoURL: network.networkLogoURL,
      networkVerifiedStatus: network.networkVerifiedStatus,
    }));

  return result;
};

const NetworksList = require("../../models/networksList");
const User = require("../../models/users");

exports.adminAddSpecificNetworksToUsersValidator = async (userEmail, numberOfNetworks) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Email ID Not Found",
      result: [],
    };
  }

  const totalNetworks = await NetworksList.countDocuments();
  const currentNetworksCount = user.networks.length;
  const remainingNetworksCount = totalNetworks - currentNetworksCount;
  numberOfNetworks = Math.min(numberOfNetworks, remainingNetworksCount);

  const networks = await NetworksList.find()
    .skip(currentNetworksCount)
    .limit(numberOfNetworks);

  const networkObjects = networks.map((network) => {
    return {
      networkId: network._id,
      approvalStatus: true,
    };
  });

  const newNetworks = networkObjects.filter((network) => {
    return !user.networks.some((existingNetwork) => {
      return existingNetwork.networkId.equals(network.networkId);
    });
  });

  if (newNetworks.length === 0) {
    return {
      success: true,
      isAuth: true,
      message: `User ${userEmail} already has all specified networks.`,
      result: [],
    };
  } else {
    const result = await User.updateOne(
      { email: userEmail },
      { $push: { networks: { $each: newNetworks } } }
    );

    return {
      success: true,
      isAuth: true,
      message: `Added ${newNetworks.length} new networks to user ${userEmail} successfully.`,
      result: newNetworks,
    };
  }
};

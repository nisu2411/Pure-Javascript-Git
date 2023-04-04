const NetworksList = require("../../models/networksList");

function prepareResponse(networks, totalNetworksCount) {
  return {
    success: true,
    isAuth: true,
    message:
      networks.length > 0
        ? "Overall Network List Fetched successfully."
        : "No Networks Found for the given search key.",
    totalNetworksCount: totalNetworksCount,
    result: networks.map((network) => ({
      networkId: network._id,
      networkName: network.networkName,
      networkLogoURL: network.networkLogoURL,
      networkVerifiedStatus: network.networkVerifiedStatus,
    })),
  };
}

exports.prepareResponse = prepareResponse;
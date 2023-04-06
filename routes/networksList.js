const express = require("express");

const router = express.Router();
const validation = require("../functions/validationFunctions");
const getOverallNetworksListController = require("../networks/getOverallNetworksList/getOverallNetworksListController");
const adminAddSpecificNetworksToUsersController = require("../networks/adminAddSpecificNetworksToUsers/adminAddSpecificNetworksToUsersController");
const myselfProfileViewUserSpecificNetworksController = require("../networks/myselfProfileViewUserSpecificNetworks/myselfProfileViewUserSpecificNetworksController");
const isAuth = require("../middleware/authMiddleware");

router.get(
  "/getOverallNetworks",
  isAuth,
  getOverallNetworksListController.getOverAllNetworksList
);


router.post(
  "/adminAddSpecificNetworksToUsers",
  isAuth,
  adminAddSpecificNetworksToUsersController.adminAddSpecificNetworksToUsers
);

router.post(
  "/myselfProfileViewUserSpecificNetworks",
  isAuth,
  myselfProfileViewUserSpecificNetworksController.myselfProfileViewUserSpecificNetworks
);
module.exports = router;

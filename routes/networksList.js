const express = require("express");

const router = express.Router();
const validation = require("../functions/validationFunctions");
const getOverallNetworksListController = require("../networks/getOverallNetworksList/getOverallNetworksListController");
const adminAddSpecificNetworksToUsersController = require("../networks/adminAddSpecificNetworksToUsers/adminAddSpecificNetworksToUsersController");
const myselfProfileViewUserSpecificNetworksController = require("../networks/myselfProfileViewUserSpecificNetworks/myselfProfileViewUserSpecificNetworksController");
const adminDeleteAllNetworksFromUsersController =require("../networks/adminDeleteAllNetworksFromUsers/adminDeleteAllNetworksFromUsersController")
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

router.delete(
  "/adminDeleteAllNetworksFromUsers",
  isAuth,
  adminDeleteAllNetworksFromUsersController.adminDeleteAllNetworksFromUsers
);
module.exports = router;

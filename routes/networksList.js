const express = require("express");

const router = express.Router();
const validation = require("../functions/validationFunctions");
const getOverallNetworksListController = require("../networks/getOverallNetworksList/getOverallNetworksListController");
const getOverallNetworksListControllerCaching = require("../networks/getOverallNetworksListCaching/getOverallNetworksListControllerCaching");
const adminAddSpecificNetworksToUsersController = require("../networks/adminAddSpecificNetworksToUsers/adminAddSpecificNetworksToUsersController");
const adminAddSpecificNetworksToUsersControllerCaching = require("../networks/adminAddSpecificNetworksToUsersCaching/adminAddSpecificNetworksToUsersControllerCaching");
const myselfProfileViewUserSpecificNetworksController = require("../networks/myselfProfileViewUserSpecificNetworks/myselfProfileViewUserSpecificNetworksController");
const myselfProfileViewUserSpecificNetworksControllerCaching = require("../networks/myselfProfileViewUserSpecificNetworksCaching/myselfProfileViewUserSpecificNetworksControllerCaching");
const adminDeleteAllNetworksFromUsersController =require("../networks/adminDeleteAllNetworksFromUsers/adminDeleteAllNetworksFromUsersController");
const adminDeleteAllNetworksFromUsersControllerCaching =require("../networks/adminDeleteAllNetworksFromUsersCaching/adminDeleteAllNetworksFromUsersControllerCaching");
const myselfProfileViewUserAvailableNetworksController =require("../networks/myselfProfileViewUserAvailableNetworks/myselfProfileViewUserAvailableNetworksController");
const myselfProfileViewUserAvailableNetworksControllerCaching =require("../networks/myselfProfileViewUserAvailableNetworksCaching/myselfProfileViewUserAvailableNetworksControllerCaching")
const isAuth = require("../middleware/authMiddleware");

router.get(
  "/getOverallNetworks",
  isAuth,
  getOverallNetworksListController.getOverAllNetworksList
);

router.get(
  "/getOverallNetworksCaching",
  isAuth,
  getOverallNetworksListControllerCaching.getOverAllNetworksList
);

router.post(
  "/adminAddSpecificNetworksToUsers",
  isAuth,
  adminAddSpecificNetworksToUsersController.adminAddSpecificNetworksToUsers
);

router.post(
  "/adminAddSpecificNetworksToUsersCaching",
  isAuth,
  adminAddSpecificNetworksToUsersControllerCaching.adminAddSpecificNetworksToUsers
);

router.post(
  "/myselfProfileViewUserSpecificNetworks",
  isAuth,
  myselfProfileViewUserSpecificNetworksController.myselfProfileViewUserSpecificNetworks
);

router.post(
  "/myselfProfileViewUserSpecificNetworksCaching",
  isAuth,
  myselfProfileViewUserSpecificNetworksControllerCaching.myselfProfileViewUserSpecificNetworks
);

router.delete(
  "/adminDeleteAllNetworksFromUsers",
  isAuth,
  adminDeleteAllNetworksFromUsersController.adminDeleteAllNetworksFromUsers
);


router.delete(
  "/adminDeleteAllNetworksFromUsersCaching",
  isAuth,
  adminDeleteAllNetworksFromUsersControllerCaching.adminDeleteAllNetworksFromUsers
);

router.post(
  "/myselfProfileViewUserAvailableNetworks",
  isAuth,
  myselfProfileViewUserAvailableNetworksController.myselfProfileViewUserAvailableNetworks
);

router.post(
  "/myselfProfileViewUserAvailableNetworksCaching",
  isAuth,
  myselfProfileViewUserAvailableNetworksControllerCaching.myselfProfileViewUserAvailableNetworks
);

module.exports = router;

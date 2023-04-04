const express = require("express");

const router = express.Router();
const validation = require("../functions/validationFunctions");
const networksController = require("../networks/getOverallNetworksList/getOverallNetworksListController");
const isAuth = require("../middleware/authMiddleware");

router.get(
  "/getOverallNetworks",
  isAuth,
  networksController.getOverAllNetworksList
);


module.exports = router;

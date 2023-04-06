const NetworksList = require("../../models/networksList");
const User=require("../../models/users");

exports.adminAddSpecificNetworksToUsers = async (req, res, next) => {
    try {
        // Parse the request parameters
        let numberOfNetworks = parseInt(req.query.numberOfNetworks);
        if (!numberOfNetworks || numberOfNetworks <= 0) {
          numberOfNetworks = 50; // set a default value of 50 if query parameter is invalid
        }
        const userEmail = req.body.email;
    
        // Fetch the specified number of networks from the networklist collection
        const networks = await NetworksList.find().limit(numberOfNetworks);
    
        // Create an array of network objects with the user's email
        const networkObjects = networks.map(network => {
          return {
            networkId: network._id,
            networkName: network.networkName,
            networkLogoURL: network.networkLogoURL,
            networkVerifiedStatus: network.networkVerifiedStatus,
            approvalStatus:true
          };
        });
    
        // Get the user's document from the users collection
        const user = await User.findOne({ email: userEmail });
        if(!user){
            return res.status(500).json({
                success: false,
                isAuth: false,
                "errorCode": -1,
                message: 'Email ID Not Found',
                result: []
              });
        }
    
        // Filter out the networks that the user already has
        const newNetworks = networkObjects.filter(network => {
          return !user.networks.some(existingNetwork => {
            return existingNetwork.networkId.equals(network.networkId);
          });
        });
    
        if (newNetworks.length === 0) {
          // Return a response indicating that no new networks were added
          return res.status(200).json({
            success: true,
            isAuth: true,
            message: `User ${userEmail} already has all specified networks.`,
            result: []
          });
        } else {
          // Insert the new networks into the user's document in the users collection
          const result = await User.updateOne(
            { email: userEmail },
            { $push: { networks: { $each: newNetworks } } }
          );
    
          // Return the response
          return res.status(200).json({
            success: true,
            isAuth: true,
            message: `Added ${newNetworks.length} new networks to user ${userEmail} successfully.`,
            result: newNetworks
          });
        }
      } catch (err) {
        console.error('Failed to add networks to user:', err);
        return res.status(500).json({
          success: false,
          isAuth: false,
          "errorCode": -1,
          message: 'Failed to add networks to user.',
          result: []
        });
      }
};

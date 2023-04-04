const NetworksList= require("../models/networksList");




exports.getOverAllNetworksList = async (req, res, next) => {
  const Networks=NetworksList;
    try {
        const start = Number(req.query.start);
        const offset = Number(req.query.offset);
        const searchKey = req.query.searchKey || '';
        const defaultStart=1;
        const defaultOffset=10;

    
        let query = {};
    

        if (searchKey) {
          const keys = searchKey.split(',');
          const or = keys.map((key) => ({
            networkName: { $regex: key.trim(), $options: 'i' },
          }));
          query = { $or: or };
        }
    
        const totalNetworksCount = await Networks.countDocuments();
    
        if (!start && !offset && !searchKey) {
          const networks = await Networks.find().limit(defaultOffset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else if ((start <= 0 || offset <= 0) && searchKey) {
          const networks = await Networks.find(query);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        }else if ((start <= 0 || offset <= 0)) {
            const networks = await Networks.find().limit(defaultOffset);
            res.status(200).send({
              success: true,
              isAuth: true,
              message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
              totalNetworksCount: totalNetworksCount,
              result: networks.map((network) => {
                return {  
                  networkId: network._id,
                  networkName: network.networkName,
                  networkLogoURL: network.networkLogoURL,
                  networkVerifiedStatus: network.networkVerifiedStatus,
                };
              })
            });
        } else if (!start && !offset && searchKey) {
          const networks = await Networks.find(query);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else if (start && offset && searchKey) {
          const networks = await Networks.find(query)
            .skip(start - 1)
            .limit(offset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else if (!start && !offset && !searchKey) {
          const networks = await Networks.find().limit(defaultOffset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else if (start && offset && !searchKey) {
          const networks = await Networks.find()
          .skip(start - 1)
          .limit(offset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else if (!start && !offset && searchKey === '') {
          const networks = await Networks.find().limit(defaultOffset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        } else {
          const networks = await Networks.find().limit(defaultOffset);
          res.status(200).send({
            success: true,
            isAuth: true,
            message: (networks.length>0)? 'Overall Network List Fetched successfully.':'No Networks Found for the given search key.',
            totalNetworksCount: totalNetworksCount,
            result: networks.map((network) => {
              return {  
                networkId: network._id,
                networkName: network.networkName,
                networkLogoURL: network.networkLogoURL,
                networkVerifiedStatus: network.networkVerifiedStatus,
              };
            })
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({
           success : false,
           isAuth:false, 
           "errorCode": -1,
            message : 'An error occurred while retrieving networks',
            result : [] 
        });
      }
};
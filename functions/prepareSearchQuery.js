const NetworksList = require("../models/networksList");

function prepareSearchQuery(searchKey) {
    let query = {};
  
    if (typeof searchKey === 'string' && searchKey.trim() !== '') {
      const keys = searchKey.split(",");
      const or = keys.map((key) => ({
        networkName: { $regex: key.trim(), $options: "i" },
      }));
      query = { $or: or };
    }
  
    return query;
  }
  
  exports.prepareSearchQuery = prepareSearchQuery;
  
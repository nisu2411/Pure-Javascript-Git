exports.validateMyselfProfileViewUserSpecificNetworks = async (data) => {
    const { userEmail } = data;
    if (!userEmail) {
      throw {
        status: 400,
        message: "Please provide user email in the request body",
      };
    }
  
    return { userEmail };
  };
  
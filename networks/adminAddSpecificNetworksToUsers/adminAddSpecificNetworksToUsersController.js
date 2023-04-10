const { adminAddSpecificNetworksToUsersValidator } = require('./adminAddSpecificNetworksToUsersValidator');
const { validateUserEmail, validateParams } = require("../../functions/emailValidator");

exports.adminAddSpecificNetworksToUsers = async (req, res) => {
  try {
    let numberOfNetworks = parseInt(req.query.numberOfNetworks);
    if (!numberOfNetworks || numberOfNetworks <= 0) {
      numberOfNetworks = 50; 
    }
    const userEmail = req.body.email;
    const validationUserEmailError = await validateUserEmail(userEmail);
    if (validationUserEmailError) {
      return res.status(500).json(validationUserEmailError)
    }
  
    const validationParamError = await validateParams(req.body);
    if (validationParamError) {
      return res.status(500).json(validationParamError);
    }
  

    const result = await adminAddSpecificNetworksToUsersValidator(userEmail, numberOfNetworks);

    return res.status(result.success ? 200 : 500).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Failed to add networks to user.",
      result: [],
    });
  }
};

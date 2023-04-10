const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function validateUserEmail(userEmail) {
  if (!userEmail) {
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Please provide user email in the request body",
      result:[]
    };
  }

  const emailDataType = typeof userEmail;
  if (emailDataType !== "string") {
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Invalid DataType Passed",
      result:[]
    };
  }

  if (!emailRegex.test(userEmail)) {
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Invalid Email Format",
      result:[]
    };
  }

  return null;
}

async function validateParams(requestBody) {
  const allowedParams = ["email"];
  const requestParams = Object.keys(requestBody);
  const invalidParams = requestParams.filter(param => !allowedParams.includes(param));
  if (invalidParams.length > 0) {
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Extra Parameter Passed In Body Request",
      result:[]
    };
  }

  return null;
}

module.exports = {
  validateUserEmail,
  validateParams
};

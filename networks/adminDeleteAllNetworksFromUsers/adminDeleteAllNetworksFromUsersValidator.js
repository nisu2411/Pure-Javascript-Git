const User = require("../../models/users");

exports.adminDeleteAllNetworksFromUsersValidator = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return {
        success: false,
        isAuth: true,
        errorCode: -1,
        message: "User not found",
        result: [],
      };
    }

    if (user.networks.length === 0) {
      return {
        success: true,
        isAuth: true,
        message: "No networks to delete",
        result: [],
      };
    }

    user.networks = [];
    await user.save();

    return {
      success: true,
      isAuth: true,
      message: "All Networks Deleted Successfully.",
      result: [],
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Server Error",
      result: [],
    };
  }
};

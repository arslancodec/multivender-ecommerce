// create token and saving that in cookies
const sendToken = (admin, statusCode, res) => {
    const token = admin.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("adminToken", token, options).json({
      success: true,
      token,
      admin,
    });
  };
  
  module.exports = sendToken;
  
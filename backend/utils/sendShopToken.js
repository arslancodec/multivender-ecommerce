// create token and saving that in cookies
const sendToken = (seller, statusCode, res) => {
    const token = seller.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("sellerToken", token, options).json({
      success: true,
      token,
      seller,
    });
  };
  
  module.exports = sendToken;
  
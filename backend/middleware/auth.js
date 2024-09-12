const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const jwt= require("jsonwebtoken")
const User = require("../model/user");
const shop = require("../model/shop");


exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to continue",401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);
    next();

})


exports.isSeller = catchAsyncErrors(async(req,res,next)=>{
    const {sellerToken}=req.cookies;
    if(!sellerToken){
        return next(new ErrorHandler("Please login to continue",401))
    }
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY)
    req.user = await shop.findById(decoded.id);
    next();

})

exports.isAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {adminToken}=req.cookies;
    if(!adminToken){
        return next(new ErrorHandler("Please login to continue",401))
    }
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY)
    req.user = await shop.findById(decoded.id);
    next();

})


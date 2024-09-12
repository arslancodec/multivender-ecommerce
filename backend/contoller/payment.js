const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();

const Stripe = require("stripe")(process.env.STIPE_PRIVATE_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await Stripe.paymentIntents.create({
      amount: req.body.amount,
      currency:"GBP",
      metadata:{
        company:"DJcompany"

      },
    });
    res.status(201).json({
        success:true,
        client_secret :myPayment.client_secret,
    })
  })
);


router.get(
    "/stripeapikey",
    catchAsyncErrors(async (req, res, next) => {
      res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    })
  );
  
  
  module.exports = router;
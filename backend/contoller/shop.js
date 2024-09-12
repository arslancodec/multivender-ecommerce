const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/sendShopToken.js");
const {isSeller} = require("../middleware/auth");

// User registration route
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      if (req.file) {
        const filename = req.file.filename;
        const filePath = path.join(__dirname, "../uploads", filename);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting the image" });
          }
        });
      }

      return next(new ErrorHandler("Shop already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email - ${seller.email} to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Activation token creation
const createActivationToken = (shop) => {
  return jwt.sign(
    {
      name: shop.name,
      email: shop.email,
      password: shop.password,
      avatar: shop.avatar,
      address: shop.address,
      phoneNumber: shop.phoneNumber,
      zipCode: shop.zipCode,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" } // Token expires in 5 minutes
  );
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Check if Shop with the same email already exists
      let seller = await Shop.findOne({ email: newSeller.email });
      if (seller) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      // If shop doesn't exist, create the shop
      const { name, email, password, avatar, address, phoneNumber, zipCode } = newSeller;
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        address,
        phoneNumber,
        zipCode,
      });

      sendShopToken (seller, 201, res);
      console.log("Shop created in DB");
    } catch (error) {
      console.error("Server error: ", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Provide all fields", 404));
      }

      // Await the shop fetching
      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Shop doesn't exist", 404));
      }

      // Check if the password is valid
      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information!", 400)
        );
      }

      // Send token if authentication is successful
      sendShopToken(seller, 201, res);
      console.log("Shop logged in");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.user.id);

      if (!seller) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      res.status(200).json({
        success: true,
        seller,
      });
      console.log("Shop given");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/logout",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("sellerToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);





router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await Shop.findById(req.user.id);
      const fileUrl=path.join(req.file.filename);
      const shop= await Shop.findByIdAndUpdate(req.user.id,{avatar:fileUrl})
      res.status(200).json({
        success: true,
        shop
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
 
  })
);









router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
// router.get(
//   "/admin-all-sellers",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const sellers = await Shop.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         sellers,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // delete seller ---admin
// router.delete(
//   "/delete-seller/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const seller = await Shop.findById(req.params.id);

//       if (!seller) {
//         return next(
//           new ErrorHandler("Seller is not available with this id", 400)
//         );
//       }

//       await Shop.findByIdAndDelete(req.params.id);

//       res.status(201).json({
//         success: true,
//         message: "Seller deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;

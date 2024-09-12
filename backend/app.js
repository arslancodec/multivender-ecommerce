const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser"); 
const cors= require("cors");
// const fileUpload = require('express-fileupload');

// Middleware setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:3000', // Update this to match your frontend URL
  credentials: true
}));
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(fileUpload({ useTempFiles: true }));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


const user = require("./contoller/user")
const shop = require("./contoller/shop")
const product = require("./contoller/product")
const event = require("./contoller/event")
const coupon = require("./contoller/coupounCode")
const payment = require("./contoller/payment")
const order = require("./contoller/order")
app.use("/api/v2/user",user)
app.use("/api/v2/shop",shop)
app.use("/api/v2/product",product)
app.use("/api/v2/event",event)
app.use("/api/v2/coupon",coupon)
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);



// Error handling middleware
app.use(ErrorHandler); 

// Export the app
module.exports = app;

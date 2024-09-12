import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  ProductDetailPage,
  ProfilePage,
  OrderSuccessPage,
  OrderDetailPage,
  TrackOrderPage,
} from "./Routes/Routes";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  ShopDashboardPage,
  ShopHomePage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopCreatePage,
  ShopLoginPage,
  SellerActivationPage,
  ShopAllOrders,
  ShopAllRefunds,
  ShopOrderDetails,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage
} from "./Routes/ShopRoutes";
import SellerProtectedRoutes from "./Routes/SellerProtectedRoutes";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  console.log(stripeApiKey);
  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoutes>
              <ShopHomePage />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoutes>
              <ShopDashboardPage />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoutes>
              <ShopCreateProduct />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoutes>
              <ShopAllOrders />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoutes>
              <ShopAllRefunds />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoutes>
              <ShopAllProducts />
            </SellerProtectedRoutes>
          }
        />
         <Route
          path="/order/:id"
          element={
            <SellerProtectedRoutes>
              <ShopOrderDetails />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoutes>
              <ShopCreateEvents />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoutes>
              <ShopAllEvents />
            </SellerProtectedRoutes>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoutes>
              <ShopAllCoupouns />
            </SellerProtectedRoutes>
          }
        /> <Route
          path="/settings"
          element={
            <SellerProtectedRoutes>
              <ShopSettingsPage />
            </SellerProtectedRoutes>
          }
        /><Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoutes>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoutes>
          }
        /><Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoutes>
              <ShopInboxPage />
            </SellerProtectedRoutes>
          }
        />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoutes = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to="/shop-login" replace />;
    }
    return children;
  }
};

SellerProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SellerProtectedRoutes;

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Product/ProductDetail";
import SuggestedProduct from "../components/Product/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allevents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const event = allevents && allevents.find((i) => i._id === id);
      setData(event);
    } else {
      const product = allProducts && allProducts.find((i) => i._id === id);
      setData(product);
    }
  }, [id, eventData, allProducts, allevents]);

  return (
    <div>
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          {!eventData && <SuggestedProduct data={data} />}
        </>
      ) : (
        <p>No data found.</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

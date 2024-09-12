import React, { useEffect, useState } from "react";
import { productData } from "../../static/data"; // Assuming productData is imported correctly
import styles from "../../styles/style"; // Importing CSS styles (assumed)
import ProductCard from "../Route/ProductCard/ProductCard"; // Assuming ProductCard component path is correct
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const { allProducts, isLoading } = useSelector((state) => state.product);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (data) {
      
      const filteredProducts = allProducts.filter((item) => item.category === data.category);
      setProducts(filteredProducts);
    }
  }, [data]); 

  return (
    <div>
      {data ? (
        <div className={`${styles.section}`}>
          <h2 className={`${styles.heading}`}>Related Products</h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12">
           
            {products && products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

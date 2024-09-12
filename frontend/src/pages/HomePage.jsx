import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero.jsx"
import Categories  from "../components/Route/Categories/Categories.jsx"
import BestDeals  from "../components/Route/Bestdeals/Bestdeal.jsx"
import FeatureProduct from "../components/Route/FeatureProduct/FeatureProduct.jsx";
import Events from "../components/Route/Events/Events.jsx"
import Sponsored from "../components/Route/Sponsored/Sponsored.jsx"
import Footer from "../components/Layout/Footer.jsx"
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeatureProduct/>
      <Sponsored/>
      <Footer/>
    </div>
  );
};

export default HomePage;

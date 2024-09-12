import React from "react";
import styles from "../../../styles/style";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-3 cursor-pointer mb-12 rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex item-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width:"150px" ,objectFit:"contain"}}
          />
        </div>
        <div className="flex item-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width:"150px" ,objectFit:"contain"}}
          />
        </div><div className="flex item-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width:"150px" ,objectFit:"contain"}}
          />
        </div>
        <div className="flex item-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width:"150px" ,objectFit:"contain"}}
          />
        </div>
        <div className="flex item-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width:"150px" ,objectFit:"contain"}}
          />
        </div>

      </div>
    </div>
  );
};

export default Sponsored;

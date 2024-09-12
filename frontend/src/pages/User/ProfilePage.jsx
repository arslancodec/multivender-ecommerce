import React, { useState } from "react";
import Header from "../../components/Layout/Header.jsx";
import styles from "../../styles/style.js";
import ProfileSidebar from "../../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
    const [active,setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px]">
          <ProfileSidebar setActive ={setActive} active={active} />
        </div>
        <ProfileContent setActive ={setActive} active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  AddBanner,
  BannerManagement,
  BannerDetails,
  EditBanner,
  CMSDashboard,
  CMSSearchedDashboard,
  AddProduct,
  EditProduct,
  EditProfile,
  ProfileCMS,
  ProductDetails,
} from "../pages/CMS";

const CMSRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/cms/dashboard" />} />
      <Route path="/banner" element={<BannerManagement />} />
      <Route path="/addBanner" element={<AddBanner />} />
      <Route path="/bannerDetails/:id" element={<BannerDetails />} />
      <Route path="/editBanner/:id" element={<EditBanner />} />
      <Route path="/dashboard" element={<CMSDashboard />}></Route>
      <Route
        path="/dashboard/:query"
        element={<CMSSearchedDashboard />}
      ></Route>
      <Route path="/add" element={<AddProduct />}></Route>
      <Route path="/details/:id" element={<ProductDetails />}></Route>
      <Route path="/edit/:id" element={<EditProduct />}></Route>
      <Route path="/profile" element={<ProfileCMS />}></Route>
      <Route path="/editProfile" element={<EditProfile />}></Route>
    </Routes>
  );
};

export default CMSRoute;

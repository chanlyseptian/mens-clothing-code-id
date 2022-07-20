import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  BannerManagement,
  CMSDashboard,
  CMSSearchedDashboard,
  AddProduct,
  EditProduct,
  EditProfile,
  ProfileCMS,
  ProductDetails,
  AddProductBulky
} from "../pages/CMS";

const CMSRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/cms/dashboard" />} />
      <Route path="/banner" element={<BannerManagement />} />
      {/* <Route path="/addBanner" element={<BannerManagement />} /> */}
      {/* <Route path="/editBanner/:id" element={<BannerManagement />} /> */}
      <Route path="/dashboard" element={<CMSDashboard />}></Route>
      <Route
        path="/dashboard/:query"
        element={<CMSSearchedDashboard />}
      ></Route>
      <Route path="add">
        <Route path="one_product" element={<AddProduct/>}></Route>
        <Route path="many_product" element={<AddProductBulky></AddProductBulky>}></Route>
      </Route>
      <Route path="/details/:id" element={<ProductDetails />}></Route>
      <Route path="/edit/:id" element={<EditProduct />}></Route>
      <Route path="/profile" element={<ProfileCMS />}></Route>
      <Route path="/editProfile" element={<EditProfile />}></Route>
    </Routes>
  );
};

export default CMSRoute;

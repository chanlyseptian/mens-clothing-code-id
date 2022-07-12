import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import ProductCardContainerUser from "../../components/ProductCardContainerUser";
import ProductCard from "../../components/ProductCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Category from "../../components/Category";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const HomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="mx-auto md:container">
      <Category />

      <div className="px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between">
        <div className="flex items-center">
          <h1 className="text-xl text-darkColor font-semibold">
            Men's Clothing
          </h1>
          <p className="text-sm text-darkColor ml-3">{data.length} products</p>
        </div>
        <div className="flex items-center space-x-10">
          <div className="flex items-center">
            <label className=" text-darkColor text-sm mr-4">Sort: </label>
            <select
              className="border hover:border-cyan-800 focus:border-cyan-900 w-full rounded-md bg-white py-1 px-4 text-darkColor text-sm"
              name="condition"
              id="condition"
              value="featured"
            >
              <option value="featured">Featured</option>
              <option value="lowToHigh">Price : Low to High</option>
              <option value="hightoLow">Price : High to Low</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>

          <div className="text-4xl flex items-center ">
            <MdKeyboardArrowLeft className="text-gray-400" />
            <p className="text-sm">1</p>
            <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mb-16">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <ProductCardContainerUser data={data} />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default HomePage;

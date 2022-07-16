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
  const [page, setPage] = useState(1);

  useEffect(() => {
    let pageAttribute = `?page=${page}`;
    dispatch(getAllProducts(pageAttribute));
  }, [page]);

  const [formFilter, setFormFilter] = useState({
    tops: false,
    bottoms: false,
    accessories: false,
    grooming: false,
  });

  // useEffect(() => {
  //   console.log(formFilter)
  // },[formFilter])

  return (
    <>
      <aside className=" flex border-r border-lightColor transform top-0 left-0 w-48 fixed h-screen ease-in-out transition-all duration-300 -translate-x-[185px] hover:translate-x-0">
        <div className="bg-darkColor w-full">
          <div className="mx-auto h-full w-full">
            <ul className="my-2 h-full text-accentColor">
              <li className="py-10 text-2xl flex justify-center items-center"></li>
              <li className="py-10 text-2xl flex justify-center items-center">
                Filter
              </li>
              <hr />
              <li className="pl-2 py-3">Categories</li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={formFilter.tops}
                  onChange={(e) => {
                    setFormFilter({ ...formFilter, tops: !formFilter.tops });
                  }}
                />
                <label>Tops</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={formFilter.bottoms}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      bottoms: !formFilter.bottoms,
                    });
                  }}
                />
                <label>Bottoms</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={formFilter.accessories}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      accessories: !formFilter.accessories,
                    });
                  }}
                />
                <label>Accessories</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={formFilter.grooming}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      grooming: !formFilter.grooming,
                    });
                  }}
                />
                <label>Grooming</label>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="mx-auto md:container">
        {/* <Category /> */}

        <div className="px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl text-darkColor font-semibold">
              Men's Clothing
            </h1>
            <p className="text-sm text-darkColor ml-3">
              {data.length} products
            </p>
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
            <ProductCardContainerUser data={data.data} />
          ) : (
            "loading"
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

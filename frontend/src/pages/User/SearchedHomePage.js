import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import ProductCardContainerUser from "../../components/ProductCardContainerUser";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SearchedHomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);



  return (
    <div className="mx-auto md:container">
      <div
        className="px-24 3xl:px-[73px] mt-3 flex cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <h1 className="text-md hover:text-cyan-600 font-semibold text-cyan-900 flex items-center">
          <MdOutlineArrowBackIos className="mr-1" /> Back
        </h1>
      </div>
      <p className="text-center text-sm text-gray-500 capitalize m-5">
        Men's / {query}
      </p>
      <div className="px-24 3xl:px-[73px] flex flex-col lg:flex-row items-center lg:mt-2 lg:mb-8 justify-between">
        <div className="flex items-center">
          <h1 className="text-xl text-cyan-900 font-semibold capitalize">
            Men's {query}
          </h1>
          <p className="text-sm text-bgcolor ml-3 ">
            
            products
          </p>
        </div>
        <div className="flex items-center space-x-10">
          <div className="flex items-center">
            <label className=" text-cyan-800 text-sm mr-4">Sort: </label>
            <select
              className="border hover:border-cyan-800 focus:border-cyan-900 w-full rounded-md bg-white py-1 px-4 text-cyan-900 text-sm"
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
            <MdKeyboardArrowRight className="text-cyan-900 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="overflow-scroll max-h-screen no-scrollbar mb-10">
        {action === "GET_ALL_PRODUCTS" &&
        status === "data" &&
        (query === "tops" ||
          query === "bottoms" ||
          query === "accessories" ||
          query === "grooming") ? (
          <ProductCardContainerUser
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <ProductCardContainerUser
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default SearchedHomePage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import {
  BsCurrencyDollar,
  BsBasketFill,
  BsFillStarFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";
import {
  addToCart,
  getCartByUserId,
  addViews,
} from "../../actions/shoppingActions";
import { TbEdit } from "react-icons/tb";
import intToRupiah from "../../helpers/rupiah";

import Swal from "sweetalert2";

import base_url from "../../helpers/base_url";

const ProductDetailsUser = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(addViews(id));
    dispatch(getProductById(id));
  }, []);

  async function inputQty() {
    const { value: qty } = await Swal.fire({
      title: "Input Quantity",
      input: "number",
      inputLabel: "How much do you want ?",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#008080",
    });

    if (qty >= 1 && qty <= data.stock) {
      dispatch(
        addToCart({
          ProductId: id,
          qty: qty,
        })
      ).then(() => {
        dispatch(getCartByUserId());
      });
    } else if (qty < 1) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must be a positive integer!",
        "error"
      );
    } else if (qty > data.stock) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must not be higher than the Product Stock!",
        "error"
      );
    }
  }

  return (
    <div>
     
      <div
        className="px-16 lg:px-24 3xl:px-[218px] mt-4  relative z-10 flex cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <h1 className="text-md hover:text-cyan-600 font-semibold text-cyan-900 flex items-center">
          <MdOutlineArrowBackIos className="mr-1" /> Back
        </h1>
      </div>
      <div className="-mt-5 grid md:grid-cols-12 sm:grid-cols-1 lg:px-20 3xl:px-[200px]">
        <div className="md:col-span-4 sm:col-span-12 sm:min-h-screen mx-auto ">
          <div className="flex px-5">
            <h1 className="text-lg flex items-center pt-10 pb-5 text-cyan-900 font-bold"></h1>
          </div>
          <div className="max-w-sm lg:mr-16 3xl:max-w-lg px-5 rounded overflow-hidden">
            <Swiper spaceBetween={50} slidesPerView={1}>
              {action === "GET_PRODUCT_BY_ID" && data !== "loading"
                ? data.ProductImages.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          className=""
                          src={`${url}/images/${img.filename}`}
                        ></img>
                      </SwiperSlide>
                    );
                  })
                : "Loading"}
            </Swiper>
            <div className="flex justify-center items-center">
              <div className="font-bold text-xl text-center mt-2 text-cyan-800">
                {data.name}
              </div>
            </div>
          </div>
        </div>
        <div className="border-r w-5 border-gray-200 3xl:ml-12" />
        <div className="md:col-span-7 sm:col-span-12 overflow-scroll no-scrollbar ">
          <div className="p-5">
            <h1 className="text-xl font-bold pt-10 pb-1 text-cyan-900">
              Description
            </h1>
            <p className="text-justify mb-3 text-cyan-900">{data.desc}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-cyan-900">Category</h1>
            <p className="mb-3 text-cyan-900 capitalize">{data.category}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-cyan-900">Condition</h1>
            <p className="mb-3 text-cyan-900 capitalize">{data.condition}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-cyan-900 capitalize">
              Unit
            </h1>
            <p className="mb-3 text-cyan-900">{data.unit}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-cyan-900">Stock</h1>
            <p>{data.stock}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-cyan-900 ">Views</h1>
            <p className="mb-3 text-cyan-900">{data.views}</p>
            <hr />
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-cyan-900">Price</h1>
                <p className="mb-3 text-cyan-900 font-semibold">
                  Rp. {intToRupiah(data.price)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-cyan-900">Rating</h1>
                <p>
                  <div className="flex justify-center mt-2">
                    {data.rating !== 0 && data.rating !== null
                      ? [...Array(data.rating)].map((x, i) => (
                          <BsFillStarFill
                            key={i}
                            className="text-amber-500"
                            size={20}
                          />
                        ))
                      : "No ratings given"}
                  </div>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-cyan-900">
                  Total Sold
                </h1>
                <p>{data.totalSold}</p>
              </div>
            </div>
            <hr className="mt-2" />
            <div className="flex justify-center mt-5 w-full 3xl:mt-6">
              <button
                className="bg-cyan-700 text-white hover:bg-cyan-900 p-4 font-semibold rounded-md w-full"
                onClick={() => inputQty()}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsUser;

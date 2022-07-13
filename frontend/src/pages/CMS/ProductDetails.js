import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import intToRupiah from "../../helpers/rupiah";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import base_url from "../../helpers/base_url";

const ProductDetails = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="p-5">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
          <div className="flex">
            <h1 className="pl-5">Product Detail</h1>
            <button
              className=" text-darkColor hover:text-cyan-600 cursor-pointer"
              onClick={() => navigate(`/cms/edit/${id}`)}
            >
              <div className="flex">
                <div className="ml-[500px] 3xl:ml-[625px]">
                  <TbEdit className="text-2xl 3xl:text-3xl font-bold mr-1" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">EDIT</h1>
                </div>
              </div>
            </button>
          </div>
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>
        {action === "GET_PRODUCT_BY_ID" &&
        status === "data" &&
        data !== "loading" ? (
          <></>
        ) : (
          <></>
        )}
        <div className="px-5 pb-10">
          <div className=" flex space-x-8">
            {data.ProductImages !== undefined ? (
              data.ProductImages.map((img, index) => {
                return (
                  <div
                    className="flex-shrink-0 flex-col my-5 w-36 h-36   shadow-lg rounded-md cursor-pointer"
                    key={index}
                  >
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-7xl">
                        <img
                          className="object-cover w-full h-40"
                          src={
                            img
                              ? url + "/images/" + img.filename
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                        />
                      </div>
                    </label>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 ">
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Name
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              disabled
              value={data.name}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Description
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <textarea
              rows="4"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={data.desc}
              disabled
            ></textarea>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Category
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="category"
              id="category"
              value={data.category}
              disabled
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Condition
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="condition"
              id="condition"
              value={data.condition}
              disabled
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={data.weight}
              disabled
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={intToRupiah(data.price)}
              disabled
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Stock
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={data.stock}
              disabled
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

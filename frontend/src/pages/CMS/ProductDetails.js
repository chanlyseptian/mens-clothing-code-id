import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import intToRupiah from "../../helpers/rupiah";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";
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
    <div>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 px-10 lg:px-32 lg:ml-52 3xl:ml-12">
        <div className="md:col-span-4 sm:col-span-12 sm:min-h-screen mx-auto ">
          <div className="flex px-5">
            <h1 className="text-lg flex items-center pt-10 pb-5 text-darkColor font-bold"></h1>
          </div>
          <div className="max-w-md 3xl:max-w-xl px-5 rounded overflow-hidden">
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
              <div className="font-bold text-xl text-center mt-2 text-midColor">
                {data.name}
              </div>
            </div>
          </div>
        </div>
        <div className="border-r w-5 border-bgcolor mr-32 px-12" />
        <div className="md:col-span-7 sm:col-span-12 overflow-scroll no-scrollbar ml-20">
          <div className="p-5">
            <div
              className="absolute text-2xl 3xl:text-3xl  font-bold text-darkColor ml-[480px] 3xl:ml-[625px] mt-5 hover:text-cyan-600 hover:scale-125 cursor-pointer"
              onClick={() => navigate(`/cms/edit/${id}`)}
            >
              <TbEdit className="" />
            </div>
            <h1 className="text-xl font-bold pt-10 pb-1 text-darkColor">
              Description
            </h1>
            <p className="text-justify mb-3 text-darkColor">{data.desc}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-darkColor">Category</h1>
            <p className="mb-3 text-darkColor capitalize">{data.category}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-darkColor">Condition</h1>
            <p className="mb-3 text-darkColor capitalize">{data.condition}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-darkColor capitalize">
              Unit
            </h1>
            <p className="mb-3 text-darkColor">{data.unit}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-darkColor">Stock</h1>
            <p>{data.stock}</p>
            <hr />
            <h1 className="pt-3 text-lg font-bold text-darkColor ">Views</h1>
            <p className="mb-3 text-darkColor">{data.views}</p>
            <hr />
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-darkColor">Price</h1>
                <p className="mb-3 text-darkColor font-semibold">
                  Rp. {intToRupiah(data.price)}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-darkColor">
                  Total Sold
                </h1>
                <p>{data.totalSold}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="pt-3 text-lg font-bold text-darkColor">
                  Rating
                </h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="container lg:mt-1 p-10">
      <div className="grid lg:grid-cols-4 gap-2 3xl:gap-28">
        <div className="lg:w-[350px] 3xl:w-[390px] ml-14 3xl:ml-[38px]">
          <img
            src="../assets/images/tops.webp"
            alt="category"
            className="w-full h-auto cursor-pointer"
            onClick={() => {
              navigate(`/user/home/tops`);
            }}
          />
        </div>
        <div className="lg:w-[350px] 3xl:w-[390px] ml-14 3xl:ml-[38px]">
          <img
            src="../assets/images/pants.webp"
            alt="category"
            className="w-full h-auto cursor-pointer"
            onClick={() => {
              navigate(`/user/home/bottoms`);
            }}
          />
        </div>
        <div className="lg:w-[350px] 3xl:w-[390px] ml-14 3xl:ml-[38px]">
          <img
            src="../assets/images/hats.webp"
            alt="category"
            className="w-full h-auto cursor-pointer"
            onClick={() => {
              navigate(`/user/home/accessories`);
            }}
          />
        </div>
        <div className="lg:w-[350px] 3xl:w-[390px] ml-14 3xl:ml-[38px] relative">
          <div className="relative">
            <img
              src="../assets/images/groom.webp"
              alt="category"
              className="lg:w-[233px] 3xl:w-[260px] h-auto cursor-pointer"
              onClick={() => {
              navigate(`/user/home/grooming`);
            }}
            />
            <p className="absolute top-0 left-0 text-2xl text-cyan-900 p-4 font-medium">
              Grooming <BsArrowRight className="text-base font-medium" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

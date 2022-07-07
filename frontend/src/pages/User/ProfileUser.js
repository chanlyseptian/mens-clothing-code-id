import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil, BiLocationPlus } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userActions";
import url from "../../helpers/base_url";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

const ProfileUser = () => {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return status === "data" && action === "GET_USER" ? (
    <div className="grid md:grid-cols-12 sm:grid-cols-1 lg:ml-52 3xl:ml-12 mb-12">
      <div className="md:col-span-6 sm:col-span-12 mx-auto">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="max-w-sm 3xl:max-w-lg">
          <div className=" relative" onClick={() => navigate(`/user/edit`)}>
            <RiEdit2Line className="top-0 right-0 absolute text-4xl   font-bold text-cyan-900  mb-4 hover:text-cyan-600 hover:scale-125 cursor-pointer" />
          </div>
          <img
            className="w-full rounded-full bg-gray-200 "
            src={url + "/images/" + data.avatar}
            alt=""
          />
          <div className="mt-3">
            <div className="text-2xl text-center mt-1 uppercase font-semibold text-cyan-900">
              {data.username}
            </div>
          </div>
        </div>
      </div>
      <div className="border-r w-5  m-5" />
      <div className="mt-20 3xl:mt-24 ">
        <div className="absolute top-2">
          <h1 className="text-2xl font-bold pt-10 pb-1 text-cyan-900 underline">
            Profile Details
          </h1>
        </div>

        <h1 className="text-xl font-semibold pt-10 pb-1 text-cyan-900">
          Username
        </h1>
        <p className="text-justify mb-3 text-cyan-900 capitalize">
          {data.username}
        </p>
        <hr />
        <h1 className="pt-3 text-lg font-semibold text-cyan-900">Email</h1>
        <p className="mb-3 text-cyan-900">{data.email}</p>
        <hr />
        <h1 className="pt-3 text-lg font-semibold text-cyan-900">Birthday</h1>
        <p className="mb-3 text-cyan-900">
          <span className="">{String(data.birthday).slice(0, 10)}</span>
        </p>
        <hr />
        <h1 className="pt-3 text-lg font-semibold text-cyan-900">Gender</h1>
        <p className="mb-3 text-cyan-900">{data.gender || "Male"}</p>
        <hr />
        <h1 className="pt-3 text-lg font-semibold text-cyan-900">Joined</h1>
        <p>{String(data.createdAt).slice(0, 10)}</p>
      </div>
    </div>
  ) : status === "loading" ? (
    "loading"
  ) : status === "error" ? (
    data
  ) : (
    String(data)
  );
};

export default ProfileUser;

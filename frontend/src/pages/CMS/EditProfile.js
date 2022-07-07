import React, { useEffect, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import url from "../../helpers/base_url";
import { MdOutlineArrowBackIos } from "react-icons/md";

function CMSProfile() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    birthday: "",
    password: "",
    avatar: null,
    type: "",
  });

  useEffect(() => {
    if (action === "GET_USER" && status === "data") {
      setForm({
        username: data.username,
        email: data.email,
        gender: data.gender,
        birthday: data.birthday.split("T")[0],
        password: "",
        avatar: null,
        type: data.type,
      });
    } else if (action === "UPDATE_USER" && status === "data") {
      dispatch(getUser());
    }
  }, [data, dispatch]);

  const submitHandler = () => {
    console.log(form);
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("birthday", form.birthday);
    formData.append("gender", form.gender);
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
    formData.append("type", "cms");
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    if (action === "UPDATE_USER" && status === "data") {
      navigate("/cms/profile");
    }
  });

  return (
    <div className="mx-auto container md:w-1/2 sm:w-96  overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-3xl font-bold text-cyan-900 text-center 3xl:mt-3 3xl:mb-8">
          Edit Profile
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>
        <div className="px-5 ">
          <div className="flex space-x-8">
            <div className="mx-auto w-40 h-40 bg-white border-4 border-cyan-800 relative cursor-pointer rounded-full flex justify-center items-center">
              <label
                className="cursor-pointer custom-file-upload"
                htmlFor="file-upload"
              >
                <img
                  className="mx-auto object-cover w-36 h-36 rounded-full"
                  src={
                    form.avatar
                      ? URL.createObjectURL(form.avatar)
                      : url + "/images/" + data.avatar
                  }
                  alt="Flower and sky"
                />
              </label>
              <input
                className="hidden"
                id="file-upload"
                type="file"
                name="image"
                accept="image"
                onChange={(e) => {
                  setForm({ ...form, avatar: e.target.files[0] });
                }}
              />
              <div className=" bg-cyan-800 rounded-full absolute top-0 right-0 px-2 py-2">
                <div className="text-2xl text-white">
                  <MdAddAPhoto />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-8" />
        <div className="grid grid-cols-2 mt-10">
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Username
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Birth Date
            </label>
            <input
              type="date"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-2/5"
              value={form.birthday}
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Gender
            </label>
            <select
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-2/5"
              name="gender"
              id="gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="false">Male</option>
              <option value="true">Female</option>
            </select>
          </div>
        </div>
        <div className="px-5 py-8">
          <button
            className="text-2xl py-2 border text-white  bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-full uppercase"
            name="condition"
            id="condition"
            onClick={() => submitHandler()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CMSProfile;

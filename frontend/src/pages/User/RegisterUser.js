import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { register, clear } from "../../actions/userActions";

function RegisterUser() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    gender: false,
    avatar: null,
  });

  useEffect(() => {
    console.log(`${action} | ${status}`);
  }, [status]);

  useEffect(() => {
    if (action === "REGISTER" && status === "data") {
      dispatch(clear()).then(() => {
        navigate(`/login`);
      });
    }
  }, [status]);

  const registerHandler = () => {
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("birthday", form.birthday);
    formData.append("gender", form.gender);
    formData.append("avatar", form.avatar);
    formData.append("type", "user");
    dispatch(register(formData));
  };
  return (
    <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-96 rounded-md">
      <div className="p-14 ">
        <div className="py-4 text-3xl font-bold text-cyan-900 text-center 3xl:mt-12 3xl:mb-8">
          Register User
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>
        <div className="px-5 py-5">
          <div className="mx-auto my-5 w-40 h-40  border-4 border-cyan-800 relative rounded-full flex justify-center items-center">
            <label
              className="cursor-pointer custom-file-upload"
              htmlFor="file-upload"
            >
              <img
                className="mx-auto object-cover w-36 h-36 "
                src={
                  form.avatar
                    ? URL.createObjectURL(form.avatar)
                    : "assets/images/user.png"
                }
                alt="Profile Picture"
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

        <div className="grid grid-cols-2 relative">
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
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
              Username
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2 ">
              Gender
            </label>
            <select
              className="border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white w-full"
              name="gender"
              id="gender"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="false">Male</option>
              <option value="true">Female</option>
            </select>
          </div>

          <div className="  px-5 py-2 mb-6">
            <label className="   block text-cyan-800 text-lg font-bold pb-2 absolute ml-[205px] 3xl:ml-[270px]  mt-2">
              Birth Day
            </label>
            <input
              type="date"
              className="  border hover:border-green-800 focus:border-cyan-800 p-2 rounded-md bg-white  absolute w-72 text-center ml-24 3xl:ml-[160px] mt-10"
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            ></input>
          </div>
        </div>
        <div className="px-5 py-8 mt-12">
          <button
            className="text-2xl py-2 border text-white bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => registerHandler()}
          >
            Register
          </button>
          <h1 className="text-md mt-3 text-cyan-800 text-center">
            Have an account ? {" "}
            <button
              className="font-bold text-cyan-800"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;

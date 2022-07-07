import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiTShirtAirFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { create } from "../../actions/cmsActions";

function AddProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
    expire: null,
    weight: 0,
    unit: "",
    category: "tops",
    condition: "available",
  });

  const [images, setImages] = useState([]);

  const addProductHandler = () => {
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("expire", form.expire);
    formData.append("weight", form.weight);
    formData.append("unit", form.unit);
    formData.append("category", form.category);
    formData.append("condition", form.condition);

    if (images.length !== 0) {
      for (const image of images) {
        formData.append("filename", image);
      }
    }
    dispatch(create(formData));
  };

  useEffect(() => {
    if (action === "CREATE" && status === "data") {
      navigate("/cms/dashboard");
    }
  }, [data]);

  const addImagesHandler = (files) => {
    setImages([...images, ...files]);
  };

  return (
    <div className="mx-auto container md:w-1/2 sm:w-96  overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-3xl font-bold text-cyan-900 text-center 3xl:mt-3 3xl:mb-8">
          Add Product
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>

        <div className="grid grid-cols-2 ">
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Name
            </label>
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Stock
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Expired Date
            </label>
            <input
              type="date"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-2/5"
              onChange={(e) => setForm({ ...form, expire: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Unit
            </label>
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Category
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-2/5"
              name="category"
              id="category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
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
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-2/5"
              name="condition"
              id="condition"
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>
          <div className="px-5 py-5">
            <h1 className="text-cyan-900 text-lg font-bold">Images</h1>
            <div className=" flex space-x-8">
              {images !== undefined ? (
                Array.from(images).map((img, index) => {
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
                                ? URL.createObjectURL(img)
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </div>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        name="filename"
                        id="file-upload"
                        onChange={(e) =>
                          setImages([...images, ...e.target.files])
                        }
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}

              {images.length === 0 && (
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded">
                  <label
                    className="cursor-pointer custom-file-upload"
                    htmlFor="file-upload"
                  >
                    <div className="text-2xl text-end text-white">
                      <IoAddCircleOutline />
                    </div>
                    <div className="text-7xl">
                      <RiTShirtAirFill className="m-auto" />
                    </div>
                    <p className="text-center">ADD IMAGE</p>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    multiple="multiple"
                    accept="image/*"
                    name="filename"
                    id="file-upload"
                    onChange={(e) => addImagesHandler(e.target.files)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="px-5 py-5">
          <button
            className="text-2xl py-2 border bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-full text-white uppercase"
            name="condition"
            id="condition"
            onClick={() => {
              addProductHandler();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

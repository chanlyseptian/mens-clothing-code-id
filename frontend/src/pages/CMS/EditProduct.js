import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { update, getProductById } from "../../actions/cmsActions";

import base_url from "../../helpers/base_url";

function EditProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
    expire: "",
    weight: 0,
    unit: "",
    category: "tops",
    condition: "available",
  });

  useEffect(() => {
    if (action === "GET_PRODUCT_BY_ID" && status === "data") {
      setForm({
        name: data.name,
        desc: data.desc,
        price: data.price,
        stock: data.stock,
        expire: data.expire ? data.expire.split("T")[0] : "",
        weight: data.weight,
        unit: data.unit,
        category: data.category,
        condition: data.condition,
      });
    }
    // else if (action === "UPDATE" && status === "data") {
    //   dispatch(getUser());
    // }
  }, [data, dispatch]);

  useEffect(() => {
    if (action === "UPDATE" && status === "data") {
      navigate(`/cms/details/${id}`);
    }
  });

  const [images, setImages] = useState();

  const editProductHandler = () => {
    let formData = new FormData();
    console.log(form);
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("expire", form.expire);
    formData.append("weight", form.weight);
    formData.append("unit", form.unit);
    formData.append("category", form.category);
    formData.append("condition", form.condition);

    // if (images.length !== 0) {
    //   for (const image of images) {
    //     formData.append("filename", image);
    //   }
    // }

    // console.log(formData);

    dispatch(update(form, id));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  return (
    <div className="mx-auto container md:w-1/2 sm:w-96  overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-3xl font-bold text-cyan-900 text-center 3xl:mt-3 3xl:mb-8">
          Edit Product
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>
        <div className="grid grid-cols-2">
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Name
            </label>
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name || ""}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              value={form.price || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Stock
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              value={form.stock || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Expired Date
            </label>
            <input
              type="date"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-2/5"
              onChange={(e) => setForm({ ...form, expire: e.target.value })}
              value={form.expire || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              value={form.weight || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Unit
            </label>
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              value={form.unit || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Category
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-2/5"
              name="category"
              id="category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form.category || "tops"}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Condition
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-2/5"
              name="condition"
              id="condition"
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              value={form.condition}
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-800 text-lg font-bold pb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              value={form.desc || ""}
            ></textarea>
          </div>
          
          <div className="flex flex-col space-x-8">
            <h1 className="text-cyan-900 text-lg font-bold ml-5">Images</h1>
            {data.ProductImages !== undefined ? (
              data.ProductImages.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex-col my-4 w-36 h-36 shadow-lg rounded-md cursor-pointer"
                  >
                    {/* <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    > */}
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
                    {/* </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => setImages(e.target.files)}
                    /> */}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="px-5 py-5 mt-2">
          <button
            className="text-2xl uppercase py-2 border text-white bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => {
              editProductHandler();
              // navigate("/cms/dashboard");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;

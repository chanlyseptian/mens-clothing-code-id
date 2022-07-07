import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { ProductCardContainerCMS } from "../../components/";
import { GiLoincloth } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";
import { RiTShirtAirFill } from "react-icons/ri";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    navigate(`/cms/dashboard/${query}`);
  }, [queryDone]);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12">
      <div className="flex items-center justify-between p-4 mb-2">
        < div className="mt-3 shadow-sm">
          <a href="" className="flex items-center">
            <GiLoincloth className="text-3xl text-cyan-900 mr-2 " />
            <span className="lg:text-3xl name-com font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-900 to-cyan-600 ">
              MEN'S CLOTHING
            </span>
          </a>
        </div>
        <div className="flex">
          <input
            className="rounded mt-6 p-2 w-full search outline-1 outline-cyan-700"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 mt-6 p-3 rounded bg-white text-cyan-700 hover:bg-cyan-700 hover:text-white"
            onClick={() => setQueryDone(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="solid"></div>

      <div className="p-3 flex justify-end">
        <div className="flex flex-col space-x-2 p-3  rounded w-fit ">
          <div className="space-x-5">
            <button
              className=" text-base rounded-md border-bottom text-cyan-800 border-0 px-3 bg-gray-200 font-semibold "
              onClick={() => {
                navigate(`/cms/dashboard/`);
              }}
            >
              All
            </button>
            <button
              className=" text-base rounded-md  text-cyan-800 hover:text-cyan-900 hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/tops`);
              }}
            >
              Tops
            </button>

            <button
              className="text-base rounded-md  text-cyan-800 hover:text-cyan-900 hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/bottoms`);
              }}
            >
              Bottoms
            </button>

            <button
              className="text-base rounded-md  text-cyan-800 hover:text-cyan-900 hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/accessories`);
              }}
            >
              Accessories
            </button>

            <button
              className="text-base rounded-md  text-cyan-800 hover:text-cyan-900 hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/grooming`);
              }}
            >
              Grooming
            </button>
          </div>
        </div>
      </div>
      <div className="solid"></div>

      <div className=" m-2 mt-6">
        <h1 className="text-xl text-cyan-900 uppercase"> Products List</h1>
        <p className="text-thin text-gray-400 mt-2 mb-3">
          You can select and customize one of <br></br> your product
        </p>
      </div>
      {/* card */}
      <div className="">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <ProductCardContainerCMS data={data} />
        ) : (
          "loading"
        )}
      </div>
      <div className="fixed right-20 bottom-8">
        <button onClick={() => navigate("/cms/add")}>
          <IoMdAddCircle
            size={50}
            className="text-cyan-600 "
          />
        </button>
      </div>
      <div className="fixed right-16 z-10 bottom-14">
        <button onClick={() => navigate("/cms/add")}>
          <RiTShirtAirFill
            size={40}
            className="text-cyan-600 mr-1 mb-1.5"
          />
        </button>
      </div>
      
    </div>
  );
};

export default CMSDashboard;

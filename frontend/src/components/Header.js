import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

import { GiLoincloth } from "react-icons/gi";
import Swal from "sweetalert2";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    // bg-gradient-to-r from-cyan-600 to-cyan-900
    <div className="bg-gradient-to-r from-cyan-600 to-cyan-900">
      <div className="container flex py-3 mx-auto border-0">
        <div className="w-4/12 3xl:w-3/12 lg:h-20 3xl:ml-3 flex justify-center items-center">
          <Link to="/user/home" className="text-2xl text-white font-semibold flex items-center">
            {/* <GiLoincloth className="text-xl mr-2 "/> */}
            <span className="text-lg ml-6 lg:ml-0 lg:text-3xl name-com font-semibold bg-clip-text">
              MEN'S CLOTHING
            </span>
          </Link>
        </div>
        <div className="w-4/12 flex justify-center items-center">
          <input
            className="rounded  p-2 w-3/5"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 p-3 rounded bg-white text-cyan-700 hover:bg-cyan-600 hover:text-white"
            onClick={() => navigate(`/user/home/${query}`)}
          >
            <FaSearch />
          </button>
        </div>

        <div className="w-4/12 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium text-white">
            <Link
              to="/user/"
              className="inline-block rounded hover:text-cyan-200 text-base"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/user/orders"
              className="inline-block border-b  hover:text-cyan-200 md:border-0 text-base"
            >
              Orders
            </Link>

            <Link
              to="/user/profile"
              className="inline-block border-b  hover:text-cyan-200 md:border-0 text-base"
            >
              User
            </Link>
          </div>
        </div>

        <div className="w-2/12 flex justify-center items-center">
          <div className=" flex flex-col justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-cyan-200 lg:mr-4 3xl:-mr-[137px] ">
            <Link
              to="/login"
              className="text-3xl hover:text-cyan-400 md:inline sm:block py-2"
              onClick={() => {
                Swal.fire("Logout Success!", "See you later!", "success");
                localStorage.clear();
              }}
            >
              <IoMdLogOut />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

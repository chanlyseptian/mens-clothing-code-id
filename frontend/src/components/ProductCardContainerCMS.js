import React from "react";
import { ProductCard } from "./";
import { useNavigate } from "react-router-dom";

const ProductCardContainerCMS = (props) => {
  const navigate = useNavigate();
  const data = props.data;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      {data.map((product, index) => {
        return (
          <div
            key={index}
          >
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};  

export default ProductCardContainerCMS;

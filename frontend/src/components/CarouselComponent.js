import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image_banner_1 from "./image_banner/banner_1.png"
import image_banner_2 from "./image_banner/banner_2.jpg"
import image_banner_3 from "./image_banner/banner_3.jpg"

const dummyImg = [
  {
    image: image_banner_2,
    label:"Not Only Clothes, We Also Sell Men's Accessories"
    
  },
  {
    image: image_banner_1,
    label: "On August 20th 10% Off All Items",
  },
  {
    image: image_banner_3,
    label: "T-Shirt for Your Daily Activities",
  },
];

const CarouselComponent = () => {
  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        {dummyImg.map((img, index) => {
          return (
            <div key={index}>
              <img
                className="object-cover"
                alt=""
                src={img.image}
                style={{ maxHeight: "60vh" }}
              ></img>
              <p
                className="legend"
                style={{
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.81)",
                  color: "#061B31",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderRadius: "0.375rem",
                }}
              >
                {img.label}
              </p>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselComponent;

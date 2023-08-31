"use client";
import Carousel from "./carousel";
import { ProductType } from "./types";
import Product, { ProductFullScreen } from "./products";
import { useState } from "react";
import { useProduct } from "./provider/productProvider";

const MainBanner = () => {
  const SliderImage = (props: { color: string }) => {
    const { color } = props;
    return (
      <div className="flex justify-center -z-10">
        <img
          src={`https://dummyimage.com/1200x700/${color}/ffffff`}
          alt={color}
        />
      </div>
    );
  };
  return (
    <div className="min-h-screen w-full my-10">
      <Carousel>
        {["blue", "green", "red","pink","black"].map((color) => (
          <SliderImage color={color} key={color} />
        ))}
      </Carousel>
    </div>
  );
};

export default function Home() {
  const {activeProducts} = useProduct()
  return (
    <main className="min-h-screen">
      <MainBanner />
      <section>
        <h1 className="text-center text-5xl my-10 font-black">Our Products</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {activeProducts.length < 0 ? "loading..." : activeProducts.map((product) => (
            <Product {...product} key={product.id}/>
          ))}
        </div>
      </section>
    </main>
  );
}

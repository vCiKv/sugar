"use client"
import { ProductType } from "@/lib/types";
import { useProduct } from "../app/provider/productProvider";
import Carousel from "./carousel";
import { useBag } from "../app/provider/bagProvider";
import { useState } from "react";
import { SelectColor } from "./selectColor";

const AddToBag = (props: { price: number; id: string }) => {
  const { addProductToBag } = useBag();
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <p className="text-lg font-semibold text-sky-300">
          N{props.price.toLocaleString("US-en")}
        </p>
        <button
          onClick={() => addProductToBag(props.id)}
          className="px-3 py-2 rounded-full text-bg-sky-300 hover:bg-sky-300/60"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};
const ProductDetails = (props: { detail: string }) => {
  return (
    <div className="my-2 overflow-y-auto h-34">
      {props?.detail ??
        "Sed sanctus amet duo consetetur et. Kasd voluptua dolore eirmod vero stet sit sit vero tempor. Et dolore clita kasd dolores ipsum, et sed tempor et lorem sit et labore sadipscing stet. Sadipscing gubergren sanctus sanctus ea. Et sit magna amet aliquyam accusam ea sed tempor amet. Rebum sit stet."}
    </div>
  );
};
const ProductTitle = (props: {
  category: string;
  collection?: string;
  name: string;
}) => {
  return (
    <div className="my-6">
      <h6 className="text-sm font-extralight">
        {props.category ?? "accessories"}
      </h6>
      <h4 className="text-3xl font-extrabold">{props.name}</h4>
      <p className="font-medium text-md">{props?.collection}</p>
    </div>
  );
};
const Product = (props: ProductType) => {
  const { createProductFullScreen } = useProduct();
  return (
    <div className="flex flex-col w-full rounded-md">
      <div className="w-full h-full 16">
        <img
          src={props.mainImageUrl}
          alt={props.name}
          loading="lazy"
          className="w-full rounded-md"
        />
      </div>
      <div className="px-4 pt-4 pb-8 space-y-3">
        <ProductTitle
          category={props.category}
          name={props.name}
          collection={props.collection}
        />
        <ProductDetails detail={props.detail} />
        <SelectColor set={()=>null} active={""}/>     
        <button
          className="font-bold underline underline-offset-2"
          onClick={() => {
            createProductFullScreen(props);
          }}
        >
          view more
        </button>
        <AddToBag price={props.priceNGN} id={props.id} />
      </div>
    </div>
  );
};
const ProductList = ()=>{
  const {activeProducts} = useProduct()
  return(
    <div className="grid justify-center grid-cols-1 gap-4 md:grid-cols-3">
      {activeProducts.length < 0 ? "loading..." : activeProducts.map((product) => (
        <Product {...product} key={product.id}/>
      ))}
    </div>
  )
}
export const NoProducts = ()=>{
  return(
    <div>
      <h2>No Products Found</h2>
    </div>
  )
}
//to do
// no scoll on full open
export const ProductFullScreen = (props: ProductType) => {
  const { closeProductFullScreen } = useProduct();
  const [productColor,setProductColor] = useState("") 
  return (
    <div className="fixed top-0 left-0 z-10 w-screen h-screen overflow-hidden bg-black/60">
      <div className="h-[10%]">
        <span
          className="fixed right-0 w-8 h-8 my-4 text-center bg-red-400 rounded-full"
          onClick={closeProductFullScreen}
        >
          X
        </span>
      </div>
      <div className="h-[90%] rounded-t-md bg-black flex justify-center ">
        <div className="flex flex-col w-full h-full overflow-y-auto rounded-md flex-nowrap md:flex-row">
          <div className="w-full h-full md:w-2/5">
            <div>
              <Carousel>
                <img
                  src={props.mainImageUrl}
                  alt={props.name}
                  loading="lazy"
                  className="w-full rounded-md"
                />
                {props.imagesUrl.map((img, index) => (
                  <img
                    src={img}
                    alt={props.name + "-" + index}
                    key={props.name + "-image-" + index}
                    loading="lazy"
                    className="w-full rounded-md"
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="w-full h-full px-6 pt-6 pb-8 md:w-3/5">
            <ProductTitle
              category={props.category}
              name={props.name}
              collection={props.collection}
            />
            <ProductDetails detail={props.detail} />
            <SelectColor set={setProductColor} active={productColor}/>
            <AddToBag price={props.priceNGN} id={props.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;

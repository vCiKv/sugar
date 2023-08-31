import Link from "next/link";
import { ProductType } from "./types";
import { useProduct } from "./provider/productProvider";
import Carousel from "./carousel";
import { useBag } from "./provider/bagProvider";

const AddToBag = (props: { price: number; id: string }) => {
  const { addProductToBag } = useBag();
  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <p className="text-lg font-semibold text-sky-300">
          N{props.price.toLocaleString("US-en")}
        </p>
        <button
          onClick={() => addProductToBag(props.id)}
          className="rounded-full text-bg-sky-300 hover:bg-sky-300/60 px-3 py-2"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};
const ProductDetails = (props: { detail: string }) => {
  return (
    <div className="h-34 overflow-y-auto my-6">
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
      <p className="text-md font-medium">{props?.collection}</p>
    </div>
  );
};
const Product = (props: ProductType) => {
  const { createProductFullScreen } = useProduct();
  return (
    <div className="flex flex-col rounded-md w-full md:w-[31%]">
      <div className="w-full h-full">
        <img
          src={props.mainImageUrl}
          alt={props.name}
          loading="lazy"
          className="w-full rounded-md"
        />
      </div>
      <div className="px-4 pt-4 pb-8">
        {/* <div className="my-6">
          <h6 className="text-sm font-extralight">
            {props.category ?? "accessories"}
          </h6>
          <h4 className="text-3xl font-extrabold">{props.name}</h4>
          <p className="text-md font-medium">{props?.collection}</p>
        </div> */}
        <ProductTitle
          category={props.category}
          name={props.name}
          collection={props.collection}
        />
        <ProductDetails detail={props.detail} />
        {/* <div className="h-34 overflow-y-auto my-6">
          {props?.descriptions ??
            "Sed sanctus amet duo consetetur et. Kasd voluptua dolore eirmod vero stet sit sit vero tempor. Et dolore clita kasd dolores ipsum, et sed tempor et lorem sit et labore sadipscing stet. Sadipscing gubergren sanctus sanctus ea. Et sit magna amet aliquyam accusam ea sed tempor amet. Rebum sit stet."}
        </div> */}
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
//to do
// no scoll on full open
export const ProductFullScreen = (props: ProductType) => {
  const { closeProductFullScreen } = useProduct();
  return (
    <div className="z-10 bg-black/60 fixed top-0 left-0 w-screen h-screen overflow-hidden">
      <div className="h-[10%]">
        <span
          className="fixed right-0 my-4 text-center bg-red-400 rounded-full w-8 h-8"
          onClick={closeProductFullScreen}
        >
          X
        </span>
      </div>
      <div className="h-[90%] rounded-t-md bg-black flex justify-center ">
        <div className="flex flex-nowrap rounded-md w-full h-full md:flex-row flex-col overflow-y-auto">
          <div className="md:w-2/5 w-full h-full">
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
                    loading="lazy"
                    className="w-full rounded-md"
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="md:w-3/5 w-full h-full px-6 pt-6 pb-8">
            {/* <div className="my-6">
              <h6 className="text-sm font-extralight">
                {props.category ?? "accessories"}
              </h6>
              <h4 className="text-3xl font-extrabold">{props.name}</h4>
              <p className="text-md font-medium">{props?.collection}</p>
            </div>
            <div className="h-34 overflow-y-auto my-6">
              {props?.descriptions ??
                "Sed sanctus amet duo consetetur et. Kasd voluptua dolore eirmod vero stet sit sit vero tempor. Et dolore clita kasd dolores ipsum, et sed tempor et lorem sit et labore sadipscing stet. Sadipscing gubergren sanctus sanctus ea. Et sit magna amet aliquyam accusam ea sed tempor amet. Rebum sit stet."}
            </div> */}
            <ProductTitle
              category={props.category}
              name={props.name}
              collection={props.collection}
            />
            <ProductDetails detail={props.detail} />
            <AddToBag price={props.priceNGN} id={props.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;

"use client";
import { useState } from "react";
import Logo from "../app/logo";
import { useRouter } from "next/navigation";
import { useBag } from "../app/provider/bagProvider";
import { useToggle } from "@/hooks/useToggle";
import { IoBag, IoMenuOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";


//to do
//kill scroll on open
// fix nav bar after scroll
// button to go up
const navigationData = [
  {
    name: "item1",
    link: "/",
    logo: "O",
  },
  {
    name: "item2",
    link: "/",
    logo: "O",
  },
  {
    name: "item3",
    link: "/",
    logo: "O",
  },
];
const Search = () => {
  const route = useRouter();
  const [searchString, setSearchString] = useState<undefined | string>(
    undefined
  );
  // const { searchActiveProducts } = useProduct();
  const findProduct = () => {
    if (searchString) {
      route.push("/search/" + searchString);
      // searchActiveProducts(searchString);
    }
  };
  return (
    <div className="flex gap-2">
      <input
        name="main-search"
        className="px-2 text-black rounded-md"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="search..."
      />
      <button
        className="px-3 py-2 rounded-md bg-sky-300/40 hover:bg-sky-300/80"
        onClick={findProduct}
      >
        Search
      </button>
    </div>
  );
};
const NoCartItem = () => {
  return <p>no items in cart </p>;
};
const Navbar = () => {
  const [isNavOpen, toggleNavOpen] = useToggle(false);
  const [isCartOpen, toggleCartOpen] = useToggle(false);
  const toggleIsNavOpen = () => {
    toggleCartOpen(false);
    toggleNavOpen();
  };
  const toggleIsCartOpen = () => {
    toggleNavOpen(false);
    toggleCartOpen();
  };
  const { bagProducts, removeProductFromBag, bagSize } = useBag();

  return (
    <nav className="z-[88]">
      <div className="flex flex-col justify-center">
        <div className="h-24 py-8 text-2xl text-center">
          <Logo />
        </div>
        <div className="w-4/5 h-12 mx-auto">
          <div className="flex items-center gap-4 justify-evenly flex-nowrap">
            <div onClick={toggleIsNavOpen} className="flex items-center">
              {isNavOpen ? <IoIosCloseCircleOutline size={32}/> : <IoMenuOutline size={32}/>}
            </div>
            <div className="flex items-center" onClick={toggleIsCartOpen}>
              <span><IoBag size={32}/></span>
              <div className="w-6 h-6 mb-2 text-sm text-center scale-75 bg-red-700 rounded-full">
                {bagSize}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Search />
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed flex flex-start top-0 left-0 w-screen h-screen bg-black/60 z-[88]">
          <span
            onClick={toggleIsNavOpen}
            className="order-2 px-2 text-4xl cursor-pointer"
          >
           <IoIosCloseCircleOutline/>
          </span>
          <div className="p-4 h-screen flex flex-col justify-evenly bg-sky-600 w-1/3 min-w-[250px]">
            <Logo />
            {navigationData.map((nav) => (
              <div key={nav.name}>{nav.name}</div>
            ))}
          </div>
        </div>
      )}
      {isCartOpen && (
        <div className="fixed flex justify-end top-0 left-0 w-screen h-screen bg-black/60 z-[88]">
          <span
            onClick={toggleIsCartOpen}
            className="order-1 px-2 text-4xl cursor-pointer"
          >
            <IoIosCloseCircleOutline/>
          </span>
          <div className="order-2 p-4 h-screen gap-2 flex flex-col bg-sky-600 w-1/3 min-w-[250px]">
            {bagProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between h-20 gap-2 rounded-md"
              >
                <div>
                  <img
                    src={product.mainImageUrl}
                    className="h-full rounded-md"
                  />
                </div>
                <div>
                  <h5 className="text-xl">{product.name}</h5>
                  <p className="font-extrabold">N{product.priceNGN}</p>
                </div>
                <div>
                  <button
                    className="px-3 py-2 rounded-md bg-red-700/50 hover:bg-red-700"
                    onClick={() => removeProductFromBag(product.id)}
                  >
                    Delete{" "}
                  </button>
                </div>
              </div>
            ))}
            {bagSize > 0 ? (
              <div>
                <button className="px-3 py-2 rounded-md bg-slate-950/30 hover:bg-slate-950">
                  CheckOut
                </button>
              </div>
            ) : (
              <NoCartItem />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

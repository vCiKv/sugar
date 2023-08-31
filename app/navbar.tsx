"use client";
import { useState } from "react";
import Logo from "./logo";
import { useProduct } from "./provider/productProvider";
import { useRouter } from "next/navigation";
import { useBag } from "./provider/bagProvider";

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
        className="px-2 rounded-md text-black"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="search..."
      />
      <button
        className="rounded-md bg-sky-300/40 hover:bg-sky-300/80 px-3 py-2"
        onClick={findProduct}
      >
        Search
      </button>
    </div>
  );
};
const NoCartItem = ()=>{
  return(
    <p>no items in cart </p>
  )
}
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => {
    setIsCartOpen(false);
    setIsNavOpen((p) => !p);
  };
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleIsCartOpen = () => {
    setIsNavOpen(false);
    setIsCartOpen((p) => !p);
  };
  const { bagProducts,removeProductFromBag,bagSize } = useBag();

  return (
    <nav className="z-[88]">
      <div className="flex flex-col justify-center">
        <div className="h-24 text-center text-2xl py-8">
          <Logo />
        </div>
        <div className="flex justify-around">
          <div onClick={toggleIsNavOpen} className="">
            {isNavOpen ? "close" : "Open"}
          </div>
          <div>
            <Search />
          </div>
          <div className="flex items-center" onClick={toggleIsCartOpen}>
            {" "}
            bag{" "}
            <div className="rounded-full bg-red-700 w-6 h-6 text-center text-sm scale-75 mb-2">
              {bagSize}
            </div>
          </div>
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed flex flex-start top-0 left-0 w-screen h-screen bg-black/60 z-[88]">
          <span
            onClick={toggleIsNavOpen}
            className="cursor-pointer text-4xl px-2 order-2"
          >
            X
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
            className="cursor-pointer text-4xl px-2 order-1"
          >
            X
          </span>
          <div className="order-2 p-4 h-screen gap-2 flex flex-col bg-sky-600 w-1/3 min-w-[250px]">
            {bagProducts.map((product) => (
              <div key={product.id} className="rounded-md flex justify-between h-20 gap-2">
                <div>
                  <img
                    src={product.mainImageUrl}
                    className="rounded-md h-full"
                  />
                </div>
                <div>
                  <h5 className="text-xl">{product.name}</h5>
                  <p className="font-extrabold">N{product.priceNGN}</p>
                </div>
                <div>
                  <button className="rounded-md px-3 py-2 bg-red-700/50 hover:bg-red-700" onClick={()=>removeProductFromBag(product.id)}>Delete </button>
                </div>
              </div>
            ))}
            {
              bagSize > 0 ? (  <div>
                <button className="rounded-md px-3 py-2 bg-slate-950/30 hover:bg-slate-950">CheckOut</button>
              </div>) : (<NoCartItem/>)
            }
          
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "@/lib/types";
import { useProduct } from "./productProvider";
const BagContext = createContext({
  bagProducts: [] as ProductType[],
  addProductToBag: (id:string) => {},
  removeProductFromBag: (id:string) => {},
  bagSize:0
});

export function BagContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bagProducts, setBagProducts] = useState<ProductType[]>([]);
  const {allProducts} = useProduct()
  const bagSize = bagProducts.length
  const getProductWithId = (productId:string)=>{
    let foundProduct = null
    // allProducts.forEach(product=>{
    //   if(product.id === productId){
    //     foundProduct = product
    //   }
    // })
    // return foundProduct
    return allProducts.find(product=>productId===product.id)
  }
  const addProductToBag= (productId:string) => {
    const currentProduct = getProductWithId(productId)
    console.log("current bag",currentProduct)

    if(currentProduct){
      setBagProducts(p=>([...p,currentProduct]))
      console.log("mg bag",bagProducts)
    }
  }
  const removeProductFromBag = (productId:string) => {
    const tempBag = bagProducts.filter((product)=>(product.id !== productId))
    setBagProducts(tempBag)
  }
  const value = {
    bagProducts,
    addProductToBag,
    removeProductFromBag,
    bagSize,
  };
 
  return (
    
    <BagContext.Provider value={value}>
      <>
        {children} 
      </>
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be BagContextProvider");
  }
  return context;
}

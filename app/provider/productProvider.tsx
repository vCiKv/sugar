import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "../types";
import { ProductFullScreen } from "../products";
const ProductContext = createContext<{
  allProducts: ProductType[];
  activeProducts: ProductType[];
  productFullScreen: undefined | ProductType;
  createProductFullScreen: (product: ProductType) => void;
  toggleProductFullScreen: () => void;
  closeProductFullScreen: () => void;
  searchActiveProducts: (str: string) => void;
}>({
  allProducts: [],
  activeProducts: [],
  productFullScreen: undefined,
  createProductFullScreen: () => {},
  toggleProductFullScreen: () => {},
  closeProductFullScreen: () => {},
  searchActiveProducts: () => {},
});

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [activeProducts, setActiveProducts] = useState<ProductType[]>([]);
  const [productFullScreen, setProductFullScreen] = useState<
    ProductType | undefined
  >(undefined);
  const [openProductFullScreen, setOpenProductFullScreen] = useState(false);

  const toggleProductFullScreen = () => {
    setOpenProductFullScreen((p) => !p);
  };
  const closeProductFullScreen = () => {
    setOpenProductFullScreen(false);
    setProductFullScreen(undefined);
  };
  const createProductFullScreen = (product: ProductType) => {
    setProductFullScreen(product);
    setOpenProductFullScreen(true);
  };

  const searchActiveProducts = (str: string) => {
    if (allProducts.length < 0) {
      return;
    }

    // const tempProducts = [...activeProducts];
    const tempProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase() === str.toLowerCase() ||
        product.category.toLowerCase() === str.toLowerCase() ||
        product.collection?.toLowerCase() === str.toLowerCase() ||
        String(product.priceNGN).toLowerCase() === str.toLowerCase() ||
        product.detail.toLowerCase() === str.toLowerCase()
    );
  
    setActiveProducts(tempProducts)

    return
  };
  useEffect(() => {
    const data: ProductType[] = require("../data.json");
    setAllProducts(data);
  },[]);
  useEffect(() => {
    if (allProducts.length > 0) {
      setActiveProducts(allProducts);
    }
  }, [allProducts]);
  const value = {
    allProducts,
    activeProducts,
    productFullScreen,
    createProductFullScreen,
    toggleProductFullScreen,
    closeProductFullScreen,
    searchActiveProducts,
  };
  return (
    <ProductContext.Provider value={value}>
      <>
        {children}
        {productFullScreen && openProductFullScreen && (
          <ProductFullScreen {...productFullScreen} />
        )}
      </>
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be ProductContextProvider");
  }
  return context;
}

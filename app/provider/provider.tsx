"use client"
import { BagContextProvider } from "./bagProvider"
import { ProductContextProvider } from "./productProvider"

const Provider = ({children}:{children:React.ReactNode})=>{
  return(
    <ProductContextProvider>
      <BagContextProvider>
        {children}
      </BagContextProvider>
    </ProductContextProvider>
  )
}
export default Provider

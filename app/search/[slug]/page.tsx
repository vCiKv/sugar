"use client"
import ProductList from "@/components/products";
import { useProduct } from "@/app/provider/productProvider";
import { useEffect } from "react"


const Page = ({params}:{params:{slug:string}})=>{
  const { searchActiveProducts,activeProducts } = useProduct();

  useEffect(()=>{
    if(params.slug){
      searchActiveProducts(params.slug);
    }
  },[params.slug])
  return(
    <main className="container mx-auto">
      <section>
        <h1 className="my-10 text-5xl font-black text-center">Products Search ({params.slug})</h1>
        <p>Found {activeProducts.length} Product(s)</p>
        <ProductList/>
      </section>
    </main>
  )
}
export default Page
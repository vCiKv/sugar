"use client"
import Product from "@/app/products";
import { useProduct } from "@/app/provider/productProvider";
import { useEffect } from "react"

const NoProducts = ()=>{
  return(
    <div>
      <h2>No Products Found</h2>
    </div>
  )
}
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
      <h1 className="text-center text-5xl my-10 font-black">Products Search ({params.slug})</h1>
      <p>Found {activeProducts.length} Product(s)</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {activeProducts.length < 0 ? "loading..." : activeProducts.map((product) => (
            <Product {...product} key={product.id}/>
          ))}
        </div>
      </section>
    </main>
  )
}
export default Page
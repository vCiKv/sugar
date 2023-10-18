import ProductList from "@/components/products";
import MainBanner from "./elements/mainBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MainBanner />
      <section>
        <h1 className="text-center text-5xl my-10 font-black">Our Products</h1>
        <ProductList/>
      </section>
    </main>
  );
}

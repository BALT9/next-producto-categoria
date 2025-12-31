import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Nav from "@/components/Home/Nav";
import Product from "@/components/Home/Product";

import { DashboardProvider } from "@/context/DashboardContext";

export default function Home() {
  return (
    <>
      <DashboardProvider>
        <Nav />
        <Hero />
        <Product />
        <Footer />
      </DashboardProvider>

    </>
  );
}

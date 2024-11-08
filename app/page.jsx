import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Menu from "@/components/layout/Menu";
import About from "@/components/layout/About";
import Services from "@/components/layout/Services";
import Location from "@/components/layout/Location";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Menu />
      <About />
      <Services />
      <Location />
      <Footer />
    </>
  );
}

import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import AboutSection from "@/components/home/AboutSection";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />
      <FeaturedDishes />
      <AboutSection />
      <Gallery />
      <Testimonials />
    </main>
  );
}

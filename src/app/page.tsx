import { Nav } from "@/components/Nav";
import { Bento } from "@/components/sections/Bento";
import { Download } from "@/components/sections/Download";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SideDots } from "@/components/SideDots";
import { Providers } from "@/components/sections/Providers";
import { Skills } from "@/components/sections/Skills";
import { Security } from "@/components/sections/Security";

export default function Home() {
  return (
    <>
      <Nav />
      <SideDots />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureTour />
        <Bento />
        <Skills />
        <Providers />
        <Security />
        <Download />
      </main>
      <Footer />
    </>
  );
}

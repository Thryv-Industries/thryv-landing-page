import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TornadoFeatures from '@/components/TornadoFeatures';
import WhyThryv from '@/components/WhyThryv';

import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <TornadoFeatures />
        <WhyThryv />

        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

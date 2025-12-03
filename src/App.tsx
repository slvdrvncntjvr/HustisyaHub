import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { GuidesLibrary } from './components/GuidesLibrary';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <HowItWorks />
      <Features />
      <GuidesLibrary />
      <About />
      <Footer />
    </div>
  );
}

import { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Footer,
  ScrollProgressBar,
  BackToTop,
} from './components';
import { StarsCanvas } from './components/canvas';

const App = () => {
  const container = useRef();

  return (
    <BrowserRouter> 
      <div ref={container} className="relative z-0 bg-primary text-white selection:bg-[#915eff] selection:text-white overflow-x-hidden min-h-screen">
        {/* Top Reading Progress Bar */}
        <ScrollProgressBar />

        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center relative">
          <Hero />
        </div>

        {/* Main Content Flow */}
        <div className="relative z-10 space-y-4">
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
        </div>

        {/* Interactive Contact & Earth Canvas with 3D Stars */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Back to Top with Scroll Ring */}
        <BackToTop />

        {/* Global Three.js Canvas for multi-view 3D tech spheres */}
        <Canvas
          eventSource={container}
          className="pointer-events-none fixed inset-0 z-0"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
          gl={{ antialias: true, alpha: true }}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </BrowserRouter>
  );
};

export default App;



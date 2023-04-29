import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'
import './index.css';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <Suspense fallback={null}>
      <Portfolio />
      <Footer />
    </Suspense>
    <Loader />
  </>
);


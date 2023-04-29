import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'
import './index.css';
import HomePage from './homepage';

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        <Suspense fallback={null}>
            <HomePage />
        </Suspense>
        <Loader />
    </>
);


import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Center, AccumulativeShadows, RandomizedLight, OrbitControls } from '@react-three/drei'
import Shoe from './Shoe';

function TextureChanger({ aiTexture }) {
    return (
        <Canvas
            shadows
            camera={{
                position: [8, 1.5, 8],
                fov: 25
            }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Center top position={[0, -1.05, 0]}>
                <Shoe aiTexture={aiTexture} />
            </Center>

            <AccumulativeShadows temporal frames={60} color={'rgb(231, 195, 228)'} colorBlend={2} toneMapped={true} alphaTest={0.9} opacity={1} scale={12} position={[0, -1, 0]}>
                <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 9, -15]} bias={0.001} />
            </AccumulativeShadows>

            <ambientLight intensity={0.5} />
            <Environment preset='city' />

            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2 * 0.9} autoRotate autoRotateSpeed={1} />
        </Canvas >
    )
}

export default TextureChanger

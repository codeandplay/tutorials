import * as THREE from 'three'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

function Shoe({ aiTexture }) {
    const { nodes } = useGLTF('/shoe.glb')

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.Object_2.geometry}
                material={new THREE.MeshStandardMaterial()}
                material-roughness={4}
                scale={[15, -15, -15]}
                rotation={[-0.5, 0, -0.05]}
            >
                <Decal
                    position={[0, 0, 0]}
                    rotation={[0, 5, 0]}
                    scale={-0.3}
                    map={useTexture(aiTexture)}
                />
            </mesh>
        </group>
    )
}

export default Shoe
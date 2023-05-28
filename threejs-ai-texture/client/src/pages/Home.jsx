import { useState } from 'react';
import TextureChanger from "../components/TextureChanger"
import MenuAction from "../components/MenuAction"
import defaultTexture from '../assets/default-texture.jpg'

function Home() {

    const [aiTexture, setAiTexture] = useState(defaultTexture)

    return (
        <>
            <div className="absolute top-6 left-6 md:top-10 md:left-10">
                <h1 className="uppercase text-5xl drop-shadow-md md:text-8xl ">Walk in Style</h1>
                <h3 className="text-xl drop-shadow-md md:text-4xl ">Create Your Custom Shoe with AI</h3>
            </div>

            <TextureChanger aiTexture={aiTexture} />

            <MenuAction setAiTexture={setAiTexture} />
        </>
    )
}

export default Home

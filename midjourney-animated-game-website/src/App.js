import React, { useEffect } from "react";
import Parallax from "parallax-js";
import elementAnimation from "element-animation";
import './App.css';

import natureBackground from "./images/background-1.png";
import dragon from "./images/dragon-2.png";
import ground from "./images/ground-3.png";
import blurredLeafs from "./images/blurredLeafs-4.png";
import leaf1 from "./images/leaf-1.png";
import leaf2 from "./images/leaf-2.png";
import leaf3 from "./images/leaf-3.png";

const layers = [
  {
    name: "nature",
    image: natureBackground,
    dataDepth: "0.05"
  },
  {
    name: "dragon",
    image: dragon,
    dataDepth: "0.15"
  },
  {
    name: "ground",
    image: ground,
    dataDepth: "0.08"
  },
  {
    name: "blurredLeafs",
    image: blurredLeafs,
    dataDepth: "0.1"
  }
]

const props = [
  leaf1,
  leaf2,
  leaf3
]

const options = {
  interval: 3000,
  rotate: [-180, 180],
  size: [80, 100],
  duration: [5, 10],
  amount: [30, 40]
}

function App() {

  useEffect(() => {
    const scene = document.getElementById("scene");
    const container = document.getElementById('element-animation')

    new Parallax(scene);

    const elemAnim = new elementAnimation(
      container,
      props,
      options
    )

    elemAnim.rainWithMousemove();
  })

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-[#1d1a29] to-[#3d2d35] flex overflow-hidden justify-center items-center">
        <div id="scene">
          {layers.map((layer, index) => (
            <img
              key={index}
              data-depth={layer.dataDepth}
              src={layer.image}
              alt={layer.name}
            />
          ))}
        </div>
        <div className="absolute top-10 left-[200px] max-w-[550px]">
          <h1 className="text-[#a0df4c] text-6xl font-bold">BLAZE THE DRAGON GAME</h1>
          <p className="text-[#aaaaaa] mt-4">Blaze is an exciting and adventurous game where players get to control an adorable dragon and fly through a magical world. The game is filled with vibrant colors, fun animations, and engaging challenges that keep players entertained for hours. </p>
          <button type="button" class="text-lime-900 text-3xl bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg px-5 py-2.5 text-center mt-4">PLAY GAME</button>
        </div>
        <div id="element-animation"></div>
      </div>
    </>
  );
}

export default App;

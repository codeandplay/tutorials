import React, { useState } from "react"
import CanvasAnimation from "@components/ThreeAnimation"
import AboutMe from "@components/AboutMe"
import Contact from "@components/Contact"
import Blog from "@components/Blog"


const IndexPage = () => {

  const [navSelected, setNavSelected] = useState(null);


  return (
    <main>
      <CanvasAnimation />

      <div className="header">
        <h1>PORTFOLIO</h1>
        <h3>By: Code and Play</h3>
      </div>

      <div className="navigation">
        <button onClick={() => setNavSelected(AboutMe)}>About</button>
        <button onClick={() => setNavSelected(Blog)}>Blog</button>
        <button onClick={() => setNavSelected(Contact)}>Contact</button>
      </div>

      <div className={`content-holder ${navSelected ? "show-content" : ""}`}>
        <div className="content-main">
          <button className="close-btn" onClick={() => setNavSelected(null)}>CLOSE</button>
          {navSelected}
        </div>
      </div>
    </main>
  )
}


export default IndexPage

export const Head = () => <title>Gatsby - Portfolio page with Three.js</title>
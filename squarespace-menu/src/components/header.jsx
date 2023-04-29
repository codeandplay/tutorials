import React, { useState } from "react"
import logo from "@images/code-and-play-logo.png";
import link1 from "@images/link-1.jpg";
import link2 from "@images/link-2.jpg";
import link3 from "@images/link-3.jpg";
import link4 from "@images/link-4.jpg";


const Header = () => {

    const [showResourcesMenu, setResourcesMenu] = useState(false);
    const [menuItemHoverImage, setMenuItemHoverImage] = useState(1);

    return (
        <header>
            <div className="navigation-container">
                <div className="logo">
                    <img src={logo} alt="" width="50px" />
                </div>
                <div className="nav">
                    <button>HOME</button>
                    <button>TEMPLATE</button>
                    <button
                        class={showResourcesMenu ? "hover" : ""}
                        onMouseEnter={() => setResourcesMenu(true)}
                        onMouseLeave={() => setResourcesMenu(false)}
                    >RESOURCES <span className="arrow"></span></button>
                </div>

                {/* sub menu */}
                <div
                    className={`sub-menu-resources ${showResourcesMenu ? "is-open" : ""}`}
                    onMouseEnter={() => setResourcesMenu(true)}
                    onMouseLeave={() => setResourcesMenu(false)}
                >
                    <div className="sub-menu-container">
                        <div className="sub-menu-col">
                            <a href="#"
                                onMouseEnter={() => setMenuItemHoverImage(1)}
                                onMouseLeave={() => setMenuItemHoverImage(1)}
                            >Link 1 <aside><span>&#129122;</span></aside></a>
                            <a href="#"
                                onMouseEnter={() => setMenuItemHoverImage(2)}
                                onMouseLeave={() => setMenuItemHoverImage(1)}
                            >Link 2 <aside><span>&#129122;</span></aside></a>
                            <a href="#"
                                onMouseEnter={() => setMenuItemHoverImage(3)}
                                onMouseLeave={() => setMenuItemHoverImage(1)}
                            >Link 3 <aside><span>&#129122;</span></aside></a>
                            <a href="#"
                                onMouseEnter={() => setMenuItemHoverImage(4)}
                                onMouseLeave={() => setMenuItemHoverImage(1)}
                            >Link 4 <aside><span>&#129122;</span></aside></a>
                        </div>
                        <div className="sub-menu-col">
                            <div className="image-container">
                                <img src={link1} className={menuItemHoverImage === 1 ? "show-image" : null} />
                                <img src={link2} className={menuItemHoverImage === 2 ? "show-image" : null} />
                                <img src={link3} className={menuItemHoverImage === 3 ? "show-image" : null} />
                                <img src={link4} className={menuItemHoverImage === 4 ? "show-image" : null} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
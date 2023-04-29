import React, { useState, useEffect, useRef } from "react";

const HomePage = () => {
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [dotSize, setDotSize] = useState(30);
    const [dotDescription, setDotDescription] = useState("");

    const menuRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setDotPosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleMouseEnter = (description) => {
        setDotSize(250);
        setDotDescription(description);
    };

    const handleMouseLeave = () => {
        setDotSize(30);
        setDotDescription("");
    };

    const images = {
        "About Me": "about-image.jpg",
        "My Work": "work-image.jpg",
        "Contact Me": "contact-image.jpg"
    };

    return (
        <>
            <div className="h-screen bg-gradient-to-r from-black to-purple-900">
                <div
                    className="w-64 h-full flex flex-col items-start justify-center ml-8 tracking-[8px]"
                    ref={menuRef}
                >
                    <div
                        className="cursor-pointer text-purple-300 uppercase text-8xl opacity-50 hover:opacity-100 hover:text-purple-400 transition ease-in-out duration-200"
                        onMouseEnter={() => handleMouseEnter("About Me")}
                        onMouseLeave={handleMouseLeave}
                    >
                        About
                    </div>
                    <div
                        className="cursor-pointer text-purple-300 uppercase text-8xl opacity-50 hover:opacity-100 mt-10 hover:text-purple-400 transition ease-in-out duration-200"
                        onMouseEnter={() => handleMouseEnter("My Work")}
                        onMouseLeave={handleMouseLeave}
                    >
                        Work
                    </div>
                    <div
                        className="cursor-pointer text-purple-300 uppercase text-8xl opacity-50 hover:opacity-100 mt-10 hover:text-purple-400 transition ease-in-out duration-200"
                        onMouseEnter={() => handleMouseEnter("Contact Me")}
                        onMouseLeave={handleMouseLeave}
                    >
                        Contact
                    </div>
                </div>
            </div>

            <div
                className="fixed w-[60vw] h-full right-0 top-0 bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(/images/${dotDescription ? images[dotDescription] : 'default.jpg'})`,
                    transition: "background-image 0.2s ease-out"
                }}
            ></div>

            <div
                className="fixed text-white flex justify-center items-center text-4xl"
                style={{
                    left: dotDescription ? dotPosition.x + 20 : dotPosition.x,
                    top: dotDescription ? dotPosition.y + 20 : dotPosition.y,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    transition: "all 0.2s ease-out",
                }}
            >
                <div className={`transition-all duration-150 delay-100 ${dotDescription ? 'opacity-1' : 'opacity-0'}`}>{dotDescription}</div>
            </div>
        </>
    );
};

export default HomePage;

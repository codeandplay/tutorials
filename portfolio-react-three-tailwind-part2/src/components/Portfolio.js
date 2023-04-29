import InteractiveMenu from "./InteractiveMenu";

const Portfolio = () => {
    return (
        <>
            <div className="absolute top-[20px] left-[20px] md:top-[60px] md:left-[100px]">
                <h1 className="drop-shadow-md text-primary md:text-[90px]"><span className="text-[30px] font-normal">Hello,</span><br />I am Smith</h1>
                <p className="text-white mt-8 text-[20px]">I am a Frontend Developer</p>
            </div>

            <InteractiveMenu />
        </>
    )
}

export default Portfolio;
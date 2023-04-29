import websiteImage1 from '../images/work/website-1.jpg'
import websiteImage2 from '../images/work/website-2.jpg'
import websiteImage3 from '../images/work/website-3.jpg'

const images = [
    { image: websiteImage1, title: "My Website 1", desc: "react and tailwind css" },
    { image: websiteImage2, title: "My Website 2", desc: "Gatsby and Three.js" },
    { image: websiteImage3, title: "My Website 4", desc: "React and Three.js" }
]


const Work = () => {
    return (
        <>
            <h1 className='drop-shadow-md text-primary md:text-[70px]'>My Work</h1>
            <h2 className='pt-2 text-primary'>Check out my previous work</h2>
            <div>
                <div>
                    <p className='text-white pt-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, justo accumsan dignissim ultrices, ante turpis pretium sapien, at hendrerit justo ipsum nec enim. Pellentesque sodales risus vel arcu lacinia accumsan. Nulla fringilla magna nec sodales efficitur. Cras a orci nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id erat sed nunc maximus interdum sed id dolor. Suspendisse fermentum elit eget feugiat ultrices. Proin eget mattis purus. Cras vitae metus blandit, tincidunt tellus eget, vulputate velit. Mauris dictum libero vel tincidunt cursus.</p>
                    <p className='text-white pt-4'>Sed ut libero id purus volutpat pharetra. In hac habitasse platea dictumst. Fusce a laoreet lorem. Mauris semper mauris eget lorem porttitor laoreet. Vivamus nulla ligula, viverra et venenatis ac, suscipit a augue. Aliquam iaculis, dui in consequat hendrerit, metus nulla sodales diam, et auctor risus sem eget velit. Sed non nisi pretium, gravida turpis et, consectetur eros. Nunc id urna erat.</p>
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-4 mt-4">
                {images.map((item, key) =>
                    <div className="mb-4 md:mb-0 rounded-[20px] border-2 border-cover relative overflow-hidden" key={key}>
                        <img src={item.image} alt="" />
                        <div className="absolute bottom-0 z-10 w-full h-[80px]">
                            <div className="absolute bg-black opacity-80 w-full h-full"></div>
                            <h2 className="top-4 left-4 relative font-bold">{item.title}</h2>
                            <p className="top-4 left-4 relative text-white">{item.desc}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Work;
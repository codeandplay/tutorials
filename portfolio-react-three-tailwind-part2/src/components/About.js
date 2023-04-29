import profile from '../images/profile.png'

const About = () => {
    return (
        <>
            <h1 className='drop-shadow-md text-primary md:text-[70px]'>About Me</h1>
            <h2 className='pt-2 text-primary'>Something little about me</h2>
            <div className="md:grid md:grid-cols-2 md:gap-4">
                <div>
                    <p className='text-white pt-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, justo accumsan dignissim ultrices, ante turpis pretium sapien, at hendrerit justo ipsum nec enim. Pellentesque sodales risus vel arcu lacinia accumsan. Nulla fringilla magna nec sodales efficitur. Cras a orci nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id erat sed nunc maximus interdum sed id dolor. Suspendisse fermentum elit eget feugiat ultrices. Proin eget mattis purus. Cras vitae metus blandit, tincidunt tellus eget, vulputate velit. Mauris dictum libero vel tincidunt cursus.</p>
                    <p className='text-white pt-4'>Sed ut libero id purus volutpat pharetra. In hac habitasse platea dictumst. Fusce a laoreet lorem. Mauris semper mauris eget lorem porttitor laoreet. Vivamus nulla ligula, viverra et venenatis ac, suscipit a augue. Aliquam iaculis, dui in consequat hendrerit, metus nulla sodales diam, et auctor risus sem eget velit. Sed non nisi pretium, gravida turpis et, consectetur eros. Nunc id urna erat.</p>
                </div>
                <div className='relative flex justify-center'>
                    <img className='w-4/6 p-1 bg-border mt-10' src={profile} alt="Profile pic" />;
                </div>
            </div>
        </>
    )
}

export default About;
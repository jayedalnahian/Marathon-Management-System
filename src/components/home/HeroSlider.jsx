import Slider from "react-slick";
import { Typewriter } from 'react-simple-typewriter';

const HeroSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="my-8 w-10/12 space-x-2 mx-auto">
            <Slider {...settings}>
                <div className="p-2">
                    <div className="h-100 rounded-2xl bg-blend-multiply backgroundIMG1  text-white flex items-center justify-center">

                        <h2 className="text-3xl font-bold bg-gray-50/60 rounded-2xl text-black p-2"> <Typewriter
                            words={["🏃 Join the Dhaka City Marathon 2025!", '🔥 Register Now and Be a Champion', '🎉 Exciting Prizes for Top Finishers!']}
                            loop={1000}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        /></h2>
                    </div>
                </div>
                <div className="p-2">
                    <div className="h-100 rounded-2xl bg-blend-multiply backgroundIMG2 bg-green-500 text-white flex items-center justify-center">
                        <h2 className="text-3xl  bg-gray-50/60 rounded-2xl  p-2 font-bold text-orange-600"><Typewriter
                            words={['🔥 Register Now and Be a Champion', "🏃 Join the Dhaka City Marathon 2025!", '🎉 Exciting Prizes for Top Finishers!']}
                            loop={1000}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        /></h2>
                    </div>
                </div>
                <div className="p-2">
                    <div className="h-100 rounded-2xl bg-blend-multiply backgroundIMG3 bg-purple-500 text-white flex items-center justify-center">
                        <h2 className="text-3xl font-bold bg-gray-50/60 rounded-2xl text-black p-2"><Typewriter
                            words={['🎉 Exciting Prizes for Top Finishers!', '🔥 Register Now and Be a Champion', "🏃 Join the Dhaka City Marathon 2025!"]}
                            loop={1000}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        /></h2>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default HeroSlider;

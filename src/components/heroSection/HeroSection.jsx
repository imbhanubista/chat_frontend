import { useNavigate } from "react-router-dom";
import logo from "../../assets/kaha-logo.png";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center md:gap-20 bg-gradient-to-t from-[#fffbf5] to-[#fffef4]">
        <div>
          <div className="flex items-center gap-3">
            <hr className="w-10 bg-orange-500 border " />
            <span className="md:text-[18px] font-medium text-gray-800 ">
              Web Developer
            </span>
          </div>
          <p className="text-[40px] lg:text-[45px] xl:text-[55px] font-bold leading-tight mt-5 sm:mt-0 ">
            I'm BhanuBhakta Bista <br />
            Designer And Developer
          </p>
          <p className="mt-5 md:text-md ">
            I'm creative designer based in Nepal, and I'm very passionate and
            dedicated to my <br /> work.Your Satisfaction is my success
          </p>
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-[16px] flex items-center px-5 py-3 md:py-4 md:px-8 rounded-xl capitalize bg-gradient-to-r from-orange-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500  relative gap-2 transition duration-300 hover:scale-105 text-white shadow-glass "
            >
              Get In Start
              <span className="animate-ping absolute right-0 top-0 w-3 h-3  rounded-full bg-gradient-to-r from-orange -400 to-orange-700 "></span>
            </button>
          </div>
        </div>
        <div className="relative sm:mt-0 mt-10 px-6 sm:px-0">
          <img
            className="w-[400px] animate__animated animate__fadeInRight animate__delay-.5s"
            src={logo}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;

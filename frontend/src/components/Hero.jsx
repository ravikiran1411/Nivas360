import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {ChevronLeft, ChevronRight, Dumbbell, ShieldCheck, Car, Trees, TrendingUp, MapPinned,} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Find Your Dream Home",
      desc: "Luxury villas and premium homes in the best locations for your family.",
      image: assets.hero_image,
      button: "Explore Villas",
      route: "/buy",
    },
    {
      title: "Live the City Lifestyle",
      desc: "Modern apartments with world-class amenities and comfort.",
      image: assets.hero_image,
      button: "Browse Apartments",
      route: "/rent",
    },
    {
      title: "Invest in Tomorrow",
      desc: "Premium plots with high ROI in fast-growing locations.",
      image: assets.hero_image,
      button: "Explore Plots",
      route: "/plots",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mx-5 sm:mx-12 mt-8">
      <div className="relative h-[75vh] overflow-hidden rounded-3xl shadow-2xl">

        {slides.map((slide, index) => (

          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              current === index
                ? "opacity-100 z-20"
                : "opacity-0 z-10"
            }`}
          >

            {/* =========================
                  SLIDE 1
            ========================== */}

            {index === 0 && (

              <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100 px-8 lg:px-16">

                <div className="lg:w-1/2">

                  <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
                    Premium Villas
                  </p>

                  <h1 className="text-4xl lg:text-6xl font-bold mt-4 leading-tight text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg text-gray-600 max-w-lg">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-8">

                    <div className="bg-white rounded-full shadow-lg px-5 py-3">
                      ✓ Verified Listings
                    </div>

                    <div className="bg-white rounded-full shadow-lg px-5 py-3">
                      ✓ Premium Locations
                    </div>

                    <div className="bg-white rounded-full shadow-lg px-5 py-3">
                      ✓ Zero Brokerage
                    </div>

                  </div>

                  <button
                    onClick={() => navigate(slide.route)}
                    className="mt-10 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-xl"
                  >
                    {slide.button}
                  </button>

                </div>

                <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">

                  <img
                    src={slide.image}
                    alt=""
                    className="w-[90%] lg:w-full object-cover rounded-3xl shadow-2xl hover:scale-105 duration-700"
                  />

                </div>

              </div>

            )}

            {/* =========================
                  SLIDE 2
            ========================== */}

            {index === 1 && (

              <div className="relative w-full h-full">

                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">

                  <p className="uppercase tracking-[6px] text-orange-300">
                    Luxury Apartments
                  </p>

                  <h1 className="text-white text-4xl lg:text-6xl font-bold mt-5">
                    {slide.title}
                  </h1>

                  <p className="text-gray-200 text-lg mt-6 max-w-2xl">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap justify-center gap-5 mt-10">

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full text-white">
                      <Dumbbell size={18}/>
                      Gym
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full text-white">
                      <Car size={18}/>
                      Parking
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full text-white">
                      <ShieldCheck size={18}/>
                      24×7 Security
                    </div>

                  </div>

                  <button
                    onClick={() => navigate(slide.route)}
                    className="mt-10 bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-xl"
                  >
                    {slide.button}
                  </button>

                </div>

              </div>

            )}
                        {/* =========================
                  SLIDE 3
            ========================== */}

            {index === 2 && (

              <div className="w-full h-full flex flex-col-reverse lg:flex-row items-center justify-between bg-gradient-to-r from-green-50 via-emerald-50 to-lime-100 px-8 lg:px-16">

                <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">

                  <img
                    src={slide.image}
                    alt=""
                    className="w-[90%] lg:w-full object-cover rounded-3xl shadow-2xl hover:scale-105 duration-700"
                  />

                </div>

                <div className="lg:w-1/2 text-center lg:text-left">

                  <p className="uppercase tracking-[5px] text-green-700 font-semibold">
                    Premium Plots
                  </p>

                  <h1 className="text-4xl lg:text-6xl font-bold mt-4 text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg text-gray-600 max-w-xl">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

                    <div className="flex items-center gap-2 bg-white shadow-lg px-5 py-3 rounded-full">
                      <TrendingUp size={18}/>
                      High ROI
                    </div>

                    <div className="flex items-center gap-2 bg-white shadow-lg px-5 py-3 rounded-full">
                      <MapPinned size={18}/>
                      Prime Location
                    </div>

                    <div className="flex items-center gap-2 bg-white shadow-lg px-5 py-3 rounded-full">
                      <Trees size={18}/>
                      Green Zone
                    </div>

                  </div>

                  <button
                    onClick={() => navigate(slide.route)}
                    className="mt-10 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-xl"
                  >
                    {slide.button}
                  </button>

                </div>

              </div>

            )}

          </div>

        ))}

        {/* Previous Button */}

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-xl p-3 rounded-full text-white hover:bg-white/40 transition-all duration-300"
        >
          <ChevronLeft size={26}/>
        </button>

        {/* Next Button */}

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-xl p-3 rounded-full text-white hover:bg-white/40 transition-all duration-300"
        >
          <ChevronRight size={26}/>
        </button>

        {/* Dots */}

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex gap-3">

          {slides.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-10 h-3 bg-white"
                  : "w-3 h-3 bg-white/60 hover:bg-white"
              }`}
            />

          ))}

        </div>

      </div>

    </div>
  );
};

export default Hero;
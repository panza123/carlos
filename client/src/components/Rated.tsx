import { useState } from "react";
import { rated } from "./index";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Rated = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rated.length - 3 : prevIndex - 1
    );
  };

  // Navigate to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === rated.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full h-full py-6 mt-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Top Rated Cars</h2>

      <div className="w-full relative flex items-center justify-center overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 33.33}%)`,
            width: `${rated.length * 33.33}%`,
          }}
        >
          {rated.map((car, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 p-2 md:p-4 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={car.pic}
                alt={car.name}
                className="w-full h-[150px] md:h-[200px] lg:h-[250px] object-cover cursor-pointer rounded-md 
                hover:scale-105 transition-all ease-in-out"
              />
              <div className="mt-2 text-center">
                <p className="text-sm md:text-lg font-medium">{car.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-10">
          <AiOutlineArrowLeft
            onClick={handlePrev}
            className="cursor-pointer text-2xl md:text-3xl text-gray-200 hover:text-gray-900 transition-colors"
          />
        </div>
        <div className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10">
          <AiOutlineArrowRight
            onClick={handleNext}
            className="cursor-pointer text-2xl md:text-3xl text-gray-200 hover:text-gray-900 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Rated;

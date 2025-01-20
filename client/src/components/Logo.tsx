
import React from "react";
import { logo } from './index';

interface Logo {
  pic: string;
  name: string;
}

const Logo: React.FC = () => {
  return (
    <div className="w-full min-h-screen px-6 py-6 bg-gray-50">
      <h2 className="text-center text-2xl font-semibold mb-6">Cars We Deal With</h2>
      <div className="w-full mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {logo.map((logos, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white cursor-pointer shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow hover:bg-gray-300"
          >
            <img
              src={logos.pic}
              alt={`Logo for ${logos.name}`}
              className="w-16 h-16 object-cover border border-gray-200"
              loading="lazy"
            />
            <p className="text-lg font-medium text-gray-800">{logos.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logo;

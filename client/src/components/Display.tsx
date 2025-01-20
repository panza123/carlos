import { services } from "./index";

// Define the type for the service object
interface Service {
  pic: string;
  name: string;
}

const Display = () => {
  return (
    <div className="w-full min-h-screen px-4 py-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Our Services</h2>
      <ul className="flex flex-wrap justify-center gap-8">
        {services.map((service: Service, index: number) => (
          <div
            key={index}
            id={`service-${index}`}
            className="max-w-xs w-full h-72 relative rounded-lg overflow-hidden shadow-lg"
          >
            {/* Service Image Container */}
            <div className="w-full h-full relative z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[-1]" />
            
              <img
                srcSet={`${service.pic}?w=600&h=400&fit=crop 600w, ${service.pic}?w=1200&h=800&fit=crop 1200w`}
                sizes="(max-width: 600px) 600px, 1200px"
                src={service.pic}
                alt={`Image for ${service.name}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-110 transition ease-in-out"
                loading="lazy"
              />
            </div>

            {/* Service Name */}
            <p className="absolute bottom-4 left-4 text-white text-xl font-semibold z-10">
              {service.name}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Display;

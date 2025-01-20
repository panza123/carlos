import about from '../assets/about.jpg';
import Contact from '../components/Contact';

const About = () => {
  return (
    <div className="w-full px-6 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center md:text-left mb-6">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <p className="text-justify mb-4 leading-relaxed">
            At Carlosas, we’re more than just your trusted car dealer – we’re your one-stop shop for all things automotive! 
            With years of experience in the industry, we pride ourselves on not only offering a wide selection of top-quality 
            vehicles but also providing expert car repair services to keep your vehicle running smoothly.
          </p>
          <p className="text-justify mb-4 leading-relaxed">
            Our skilled team of certified mechanics is dedicated to delivering exceptional repair and maintenance solutions. 
            Whether it's routine servicing, complex diagnostics, or bodywork, we’ve got you covered. We also understand the 
            importance of getting your car back on the road quickly and safely, which is why we offer fast and efficient repair services.
          </p>
          <p className="text-justify mb-4 leading-relaxed">
            In addition to our repair expertise, we also specialize in shipping cars directly to your doorstep, ensuring a 
            hassle-free buying experience from start to finish. Whether you're purchasing locally or out of state, we make 
            sure that your car arrives safely, promptly, and ready to drive.
          </p>
          <p className="text-justify leading-relaxed">
            At Carlosas, we’re committed to providing unbeatable customer service, helping you find the perfect car, and keeping 
            it in peak condition for years to come. Drive with confidence knowing that we’re here to support you every step of the way.
          </p>
        </div>
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={about}
            alt="About Carlosas"
            className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-md"
          />
        </div>

      </div>
      <div>
        <Contact/>
      </div>
    </div>
  );
};

export default About;

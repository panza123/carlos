
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold">Carlosas</h2>
          <p className="text-gray-400">Building connections, one click at a time.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
          <a
            href="https://www.facebook.com/share/15CaaHV5uN/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/carlosastech/profilecard/?igsh=MWgxMGxhemYxZzlmNg%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://wa.me/08025386934"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={30} />
          </a>
          <a
            href="mailto:carlosastech@gmail.com"
            className="text-red-600 hover:text-red-500 transition"
            aria-label="Gmail"
          >
            <FaEnvelope size={30} />
          </a>
          <a
            href="https://x.com/carlosastech?t=sVrJ75YflC5pzLMRLXp_3Q&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition"
            aria-label="Twitter"
          >
            <FaTwitter size={30} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-6">
        <p>&copy; {new Date().getFullYear()} Carlosas. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

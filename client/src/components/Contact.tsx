import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope,FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="w-full px-6 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaFacebook size={30} className="text-blue-600" />
            <a
              href="https://www.facebook.com/share/15CaaHV5uN/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-700 hover:underline"
            >
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaInstagram size={30} className="text-pink-500" />
            <a
              href="https://www.instagram.com/carlosastech/profilecard/?igsh=MWgxMGxhemYxZzlmNg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-700 hover:underline"
            >
              Instagram
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaWhatsapp size={30} className="text-green-500" />
            <a
              href="https://wa.me/08025386934"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-700 hover:underline"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope size={30} className="text-red-600" />
            <a
              href="mailto:carlosastech@gmail.com"
              className="text-lg font-medium text-gray-700 hover:underline"
            >
              Gmail
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaTwitter size={30} className="text-blue-400" />
            <a
              href="https://x.com/carlosastech?t=sVrJ75YflC5pzLMRLXp_3Q&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-700 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
          {/* Location Map */}
          <div className="w-full h-64">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10265368.078264253!2d3.202946228247557!3d9.082001434740376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f6a8d1248b%3A0x8ccf3d8a5f57312d!2sNigeria!5e0!3m2!1sen!2sng!4v1691695123456!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Instagram, Linkedin, Youtube, 
  Mail, Phone, MessageCircle 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={18} />, color: 'hover:text-pink-500', link: '#' },
    { icon: <Linkedin size={18} />, color: 'hover:text-blue-500', link: '#' },
    { icon: <Facebook size={18} />, color: 'hover:text-blue-600', link: '#' },
    { icon: <Youtube size={18} />, color: 'hover:text-red-500', link: '#' },
    { icon: <MessageCircle size={18} />, color: 'hover:text-green-500', link: '#' }, // WhatsApp
  ];

  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-6 px-4 md:px-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Contacts & Socials in one row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          
          {/* Admin Contacts */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <motion.a 
              whileHover={{ scale: 1.05, color: '#fff' }}
              href="mailto:admin@umsystems.in" 
              className="flex items-center gap-2 transition-colors"
            >
              <Mail size={16} className="text-blue-500" /> admin@umsystems.in
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: '#fff' }}
              href="tel:+910000000000" 
              className="flex items-center gap-2 transition-colors"
            >
              <Phone size={16} className="text-blue-500" /> +91 00000 00000
            </motion.a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                whileHover={{ y: -4, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`${social.color} transition-colors duration-300`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

        {/* Bottom Section: Branding */}
        <div className="text-center space-y-2">
          <p className="text-[11px] md:text-xs tracking-wider uppercase text-gray-500">
            © {currentYear} UMSystems. All rights reserved.
          </p>
          <div className="text-[13px] flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span className="text-gray-400">Designed & Developed by</span>
            <motion.span 
              whileHover={{ color: '#60a5fa' }}
              className="text-white font-semibold cursor-default"
            >
              UMSystems
            </motion.span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Powered by</span>
            <motion.span 
              whileHover={{ letterSpacing: '1px' }}
              className="text-green-500 font-bold transition-all"
            >
              GRAMBASKET PVT LIMITED
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
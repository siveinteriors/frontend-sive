import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 z-10">
      <hr className="border-t border-gray-300 mb-4" />
      <div className="md:flex md:justify-center md:space-x-4">
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SIVE
        </div>
        <div className="text-center text-gray-500 text-sm">
          Made with 💖 by{" "}
          <a href="https://atomiqx.com/">Atomiqx Technologies Co.</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

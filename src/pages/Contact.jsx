import axios from "axios";
import "../index.css"; 
import React, { useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    phone: "", // Add phone to the state
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      user_phone: formData.phone,  // Include phone number in the template params
      message: formData.message,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/projects/sendMail`,
        formData
      );

      setFormdata({
        email: "",
        name: "",
        phone: "", // Reset phone number after successful submission
        message: "",
        loading: false,
        alertmessage: "SUCCESS! Thank you for your message.",
        variant: "success",
        show: true,
      });
    } catch (error) {
      console.error("Error occurred while sending mail:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start px-4 py-12 bg-gray-50">
      {/* Left side - Image and Contact Info */}
      <div className="w-full lg:w-1/2 max-w-[700px] mb-8 lg:mb-0 lg:pr-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://i.postimg.cc/L5yJHxgP/MG-0782.jpg"
            alt="Location"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Contact Us
            </h1>

            {/* Inquiries */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Inquiries:
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-medium">Phone:</span> +91 9910605419
              </p>
              <div className="text-lg text-gray-600">
                <span className="font-medium">Email:</span>
                <div className="ml-4 mt-2 space-y-1">
                  <a
                    href="mailto:info@siveinteriors.com"
                    className="text-blue-600 hover:underline block"
                  >
                    info@siveinteriors.com
                  </a>
                  <a
                    href="mailto:contact@siveinteriors.com"
                    className="text-blue-600 hover:underline block"
                  >
                    contact@siveinteriors.com
                  </a>
                  <a
                    href="mailto:careers@siveinteriors.com"
                    className="text-blue-600 hover:underline block"
                  >
                    careers@siveinteriors.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Location:
              </h2>
              <p className="text-lg text-gray-600">Sector 51, Gurgaon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="w-full lg:w-1/2 max-w-[700px] pl-0 lg:pl-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Send us a message
          </h2>
          {formData.show && (
            <div
              className={`mb-4 p-4 rounded-md text-white ${
                formData.variant === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {formData.alertmessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={formData.loading}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                {formData.loading ? "Sending..." : "Get A Quote"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

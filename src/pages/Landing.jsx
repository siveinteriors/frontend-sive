import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import Contact from "./Contact";
const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const images = [
    "https://i.postimg.cc/cCqSfwqz/image-10.png",
    "https://i.postimg.cc/zf9SNGYN/MG-0747.jpg",
    "https://i.postimg.cc/MKCWykwT/4.jpg",
    "https://i.postimg.cc/VNSdz9zr/23-04-14-Tulip-Ivory-67.jpg",
  ];

  useEffect(() => {
    // Fetch the projects from the backend
    axios
      .get(`${apiBaseUrl}/api/projects`)
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Full Screen Image Slider */}
      <div className="w-full h-screen overflow-hidden">
        <Swiper
          loop={true}
          autoplay={{ delay: 3500 }}
          className="h-full"
          modules={[Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to SIVE Design Studio
          </h2>
          <p className="text-lg text-gray-600">
            Sive design Studio, based in Gurgaon, India, specializes in crafting
            bespoke interiors for both residential and commercial spaces. With a
            focus on innovative design and impeccable craftsmanship, the studio
            transforms ordinary spaces into extraordinary experiences. Their
            projects range from luxurious residences to modern commercial
            establishments, each tailored to reflect the unique vision and style
            of their clients. Committed to quality and functionality, Sive
            design Studio brings creativity and precision to every project they
            undertake.
          </p>
        </div>
      </section>

      {/* Card Slider */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-100">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          {projects.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="object-cover w-full h-44"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                {/* <p className="text-gray-600">{card.description}</p> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Contact />
    </div>
  );
};

export default LandingPage;

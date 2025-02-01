import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    photographer: "",
    location: "",
    description: "",
    imageUrls: [], // Changed from 'images' to 'imageUrls'
  });
  const [imageUrl, setImageUrl] = useState(""); // New state to store the current input URL

  useEffect(() => {
    // Fetch the projects from the backend
    axios
      .get(`${apiBaseUrl}/api/projects`)
      .then((response) => setProjects(response.data.projects))
      .catch((error) => console.error(error));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      // Add the new URL to the imageUrls array
      setFormData((prevData) => ({
        ...prevData,
        imageUrls: [...prevData.imageUrls, imageUrl],
      }));
      setImageUrl(""); // Reset the URL input field
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post(`${apiBaseUrl}/api/projects/upload`, formData)
      .then((response) => {
        setProjects([...projects, response.data.project]);
        setFormData({
          title: "",
          photographer: "",
          location: "",
          description: "",
          imageUrls: [],
        });
        setIsLoading(false);
        alert("Project uploaded successfully!");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message); // Show error message
        } else {
          alert("An unexpected error occurred");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiBaseUrl}/api/projects/${id}`)
      .then((response) => {
        setProjects(projects.filter((project) => project._id !== id));
        alert("Project deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-screen">
        {/* Left Side - Form */}
        <div className="bg-white p-6 flex flex-col sm:border-b-2 lg:border-r-2 lg:border-b-0 border-blue-400">
          <div className="relative">
            <Link to="/admin">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="photographer"
                className="block text-sm font-medium text-gray-700"
              >
                Photographer
              </label>
              <input
                type="text"
                name="photographer"
                id="photographer"
                value={formData.photographer}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="imageUrls"
                className="block text-sm font-medium text-gray-700"
              >
                Add Image URLs
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {formData.imageUrls.length > 0 && (
                  <ul className="list-disc pl-5">
                    {formData.imageUrls.map((url, index) => (
                      <li key={index} className="text-sm">
                        {url}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {isLoading ? (
              <div className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center">
                Uploading...
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Upload Project
              </button>
            )}
          </form>
        </div>

        {/* Right Side - Display Projects */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto h-screen">
          <h2 className="text-2xl font-bold mb-4">All Projects</h2>
          <div className="space-y-4">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p>{project.location}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

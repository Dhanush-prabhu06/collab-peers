import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectname: "",
    description: "",
    availableSlots: "",
    technology: [],
    roles: [],
    deadline: "",
  });
  const navigate = useNavigate();
  const technologies = [
    "design",
    "figma",
    "web app",
    "mobile",
    "pwa",
    "frontend",
    "backend",
    "DevOps",
    "AI",
    "machine learning",
    "databases",
    "cloud",
    "API",
    "full-stack",
    "GPT-powered",
    "test",
    "tech",
    "html,css",
    "javascript",
    "typescript",
    "node.js",
    "react",
    "angular",
    "vue.js",
    "graphql",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "firebase",
    "mongodb",
    "sql",
    "svg",
    "dev",
    "gamedev",
    "informatique",
  ];

  const roles = [
    "Backend Developer",
    "Frontend Developer",
    "UI/UX Developer",
    "ML Developer",
    "Data Scientist",
    "DevOps Engineer",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    if (value && !formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
    e.target.value = "";
  };

  const removeSelectedItem = (field, value) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Convert the deadline to a Date object
      const deadlineDate = new Date(formData.deadline);

      // Prepare the data to send
      const projectData = {
        ...formData,
        availableSlots: Number(formData.availableSlots), // Ensure it's a number
        deadline: deadlineDate, // Use the Date object here
      };

      const response = await axios.post(
        "http://localhost:8000/api/project/create",
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project submitted successfully:", response.data);
      setFormData({
        projectname: "",
        description: "",
        availableSlots: "",
        technology: [],
        roles: [],
        deadline: "",
      });
      toast.success("Project submitted successfully!");
      navigate("/my-projects");
    } catch (error) {
      console.error("There was an error submitting the project:", error);
      toast.error("Error submitting project. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Submit a New Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="projectname"
          placeholder="Project Name"
          value={formData.projectname}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="availableSlots"
          placeholder="Available Slots"
          value={formData.availableSlots}
          onChange={handleChange}
          required
          min="1" // This ensures that the value cannot be less than 1
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Technology Selection */}
        <div>
          <select
            onChange={(e) => handleSelectChange(e, "technology")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Technologies</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.technology.map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md cursor-pointer flex items-center"
              >
                {tech}
                <button
                  onClick={() => removeSelectedItem("technology", tech)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  type="button" // Ensure button does not submit the form
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Roles Selection */}
        <div>
          <select
            onChange={(e) => handleSelectChange(e, "roles")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.roles.map((role) => (
              <span
                key={role}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-md cursor-pointer flex items-center"
              >
                {role}
                <button
                  onClick={() => removeSelectedItem("roles", role)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  type="button" // Ensure button does not submit the form
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <h5>Deadline For Applying</h5>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]} // Set minimum date to today's date
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;

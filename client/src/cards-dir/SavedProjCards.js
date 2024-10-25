import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md"; // Delete icon
import { FaRegEdit } from "react-icons/fa"; // Edit icon (or you can use it for another action if necessary)

const SavedProjCards = (props) => {
  const navigate = useNavigate();

  // State management for showing hover labels
  const [showUnsaveLabel, setShowUnsaveLabel] = useState(false);
  const [showDetailsLabel, setShowDetailsLabel] = useState(false);

  // Unsave project function
  const unsaveProject = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("Token not found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/project/unsave/${props.id}`, // Corrected backticks for template literals
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed the template string here
          },
        }
      );

      console.log("Project unsaved successfully", response.data);
      alert("Project unsaved successfully");
      window.location.reload(); // Refresh the page after unsaving the project
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Navigate to project details page
  const showDetails = () => {
    navigate(`/details/${props.id}`); // Fixed the navigate route to use backticks for dynamic routing
  };

  return (
    <div className="bg-white z-10 shadow-md rounded-lg border-l-4 border-indigo-600 p-6 w-[300px] my-4 transform transition-transform duration-200 hover:scale-105">
      <div className="flex justify-end mb-4 gap-5">
        {/* Unsave Icon */}
        <div
          onMouseEnter={() => setShowUnsaveLabel(true)}
          onMouseLeave={() => setShowUnsaveLabel(false)}
          onClick={unsaveProject}
          className="hover:cursor-pointer flex items-center gap-1 text-red-600 transform transition-transform duration-200 hover:scale-125 relative"
        >
          <MdDeleteOutline />
          {showUnsaveLabel && (
            <div className="absolute z-50 top-[-20px] bg-gray-700 text-white text-sm p-1 rounded shadow-lg">
              Unsave
            </div>
          )}
        </div>
      </div>

      {/* Project name that links to details */}
      <div
        onMouseEnter={() => setShowDetailsLabel(true)}
        onMouseLeave={() => setShowDetailsLabel(false)}
        onClick={showDetails}
        className="hover:cursor-pointer text-center items-center text-lg font-semibold text-gray-800 mb-2 relative"
      >
        {props.project}
      </div>

      {/* Render Skills and Technologies */}
    </div>
  );
};

// Skills component for displaying roles
const Skills = (props) => {
  const data = props.roles;
  return (
    <div className="ml-2 flex flex-row gap-2">
      {data.map((role, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
        >
          {role}
        </span>
      ))}
    </div>
  );
};

export default SavedProjCards;

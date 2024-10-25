import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiSave, FiEye } from "react-icons/fi"; // Import icons from React Icons

const Cards = (props) => {
  const [showDetailsDashboard, setShowDetailsDashboard] = useState(false);
  const [showSaveDashboard, setShowSaveDashboard] = useState(false);

  const saveProject = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("Token not found");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/project/save/${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project saved successfully", response.data);
        toast.success("Project saved successfully");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/details/${props.id}`);
  };

  // Format the expire date in Indian format (DD/MM/YYYY)
  const formatExpireDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN"); // Indian format
  };

  return (
    <div className="mt-9 flex flex-col items-center">
      <div className="bg-[#F5F7FA] shadow-md rounded-lg w-full max-w-[850px] border border-gray-200 shadow-indigo-600  delay-[0.15s] duration-75 transition-transform p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold text-gray-800">
              College:{" "}
              <span className="text-gray-900">{props.college_name}</span>
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Project:{" "}
              <span className="text-gray-900">{props.Project_name}</span>
            </div>
            <div className="text-md text-gray-500">
              Year: <span className="text-gray-700">{props.year}</span>
            </div>
            <div className="text-md text-gray-500">
              Available Slots:{" "}
              <span className="text-gray-700">{props.availableSlots}</span>
            </div>
            <div className="text-md text-gray-500">
              Roles: <Skills roles={props.roles} />
            </div>
            <div className="text-md text-gray-500">
              Technologies: <Technologies technology={props.technology} />
            </div>
          </div>
          <div className="flex flex-col justify-between items-end mt-4 md:mt-0">
            <div className="flex flex-row justify-center gap-6 relative">
              {/* Show Details icon with hover functionality */}
              <div
                onMouseEnter={() => setShowDetailsDashboard(true)}
                onMouseLeave={() => setShowDetailsDashboard(false)}
                className="relative cursor-pointer text-[#6366F1]"
              >
                <FiEye size={24} onClick={showDetails} />
                {showDetailsDashboard && (
                  <div className="absolute top-full mt-2 left-[-50%] bg-white p-2 shadow-lg border border-gray-200 rounded-lg ">
                    View details
                  </div>
                )}
              </div>
              {/* Save icon with hover functionality */}
              <div
                onMouseEnter={() => setShowSaveDashboard(true)}
                onMouseLeave={() => setShowSaveDashboard(false)}
                className="relative cursor-pointer text-[#4CAF50]"
              >
                <FiSave size={24} onClick={saveProject} />
                {showSaveDashboard && (
                  <div className="absolute top-full mt-2 left-[-50%] bg-white p-2 shadow-lg border border-gray-200 rounded-lg ">
                    Save
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-6">
              Expires on:{" "}
              <span className="text-gray-700">
                {formatExpireDate(props.expire_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = (props) => {
  const data = props.roles;
  return (
    <div className="ml-2 flex flex-wrap gap-3 mt-2">
      {data.map((role, index) => (
        <span
          key={index}
          className="bg-[#E0E7FF] text-gray-700 px-3 py-1 rounded-md text-sm"
        >
          {role}
        </span>
      ))}
    </div>
  );
};

const Technologies = (props) => {
  const data = props.technology;
  return (
    <div className="ml-2 flex flex-wrap gap-3 mt-2">
      {data.map((tech, index) => (
        <span
          key={index}
          className="bg-[#E0E7FF] text-gray-700 px-3 py-1 rounded-md text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default Cards;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ProjectDetailCard = (props) => {
  const id = props.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/project/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const projData = data.data || {};

  // Helper function to format the date to Indian format (DD-MM-YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Project Details
        </h2>

        <div className="mb-2">
          <span className="font-medium text-gray-700">User Email: </span>
          <span>{projData.email}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Project Name: </span>
          <span>{projData.projectname}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">College Name: </span>
          <span>{projData.collegename}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Year: </span>
          <span>{projData.year}</span>
        </div>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Description: </span>
          <p className="text-gray-600">{projData.description}</p>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Available Slots: </span>
          <span>{projData.availableSlots}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Created At: </span>
          <span>{formatDate(projData.createdAt)}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Expires On: </span>
          <span>{formatDate(projData.deadline)}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Roles: </span>
          <p>
            <Skills roles={projData.roles || []} />
          </p>
        </div>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Technology: </span>
          <p>
            <Technologies technology={projData.technology || []} />
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Contact:</h3>
          <div className="mt-2">
            <span className="font-medium text-gray-700">WhatsApp</span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-700">Email</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = (props) => {
  const data = props.roles || []; // Fallback to empty array if roles is undefined
  return (
    <div className="flex flex-wrap gap-4">
      {" "}
      {/* Use flex-wrap to handle overflow */}
      {data.map((element, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded">
          {element}
        </div>
      ))}
    </div>
  );
};

const Technologies = (props) => {
  const data = props.technology || []; // Fallback to empty array if technology is undefined
  return (
    <div className="flex flex-wrap gap-4">
      {" "}
      {/* Use flex-wrap to handle overflow */}
      {data.map((element, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded">
          {element}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetailCard;

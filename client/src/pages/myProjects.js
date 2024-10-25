import React, { useState, useEffect } from "react";
import MyProjectsCards from "../cards-dir/MyprojectsCards";
import axios from "axios";
import { FaPlus } from "react-icons/fa"; // Importing the plus icon

const MyProjects = () => {
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
          "http://localhost:8000/api/project/my-project",
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
        console.error("Error : ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // If response.data contains the "getAll" key, use it, otherwise use an empty array
  const myProject_data = data.getAll || [];
  console.log(myProject_data);
  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="flex flex-col items-center">
        <div className="flex-row justify-center gap-6 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card for adding a new project */}
          <a href="/new-project">
            <div className="bg-white shadow-md rounded-lg border-l-4 border-indigo-600 p-6 w-[300px] h-[150px] my-4 flex flex-col justify-center items-center transform transition-transform duration-200 hover:scale-105 relative">
              <div className="font-bold mb-4">Add project</div>
              <div className="text-4xl text-indigo-600">
                <FaPlus />
              </div>
            </div>
          </a>

          {/* Render project cards if data exists */}
          {!loading && !error && myProject_data.length > 0 ? (
            myProject_data.map((element, index) => (
              <MyProjectsCards
                key={index}
                college_name={element.collegename}
                project_name={element.projectname}
                description={element.description}
                year={element.year}
                slots={element.availableSlots}
                roles={element.roles}
                id={element._id}
                technology={element.technology}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">
                  No Projects found
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  It looks like you haven't added any projects yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProjects;

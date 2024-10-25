import React, { useEffect, useState } from "react";
import SavedProjCards from "../cards-dir/SavedProjCards";
import axios from "axios";

const SavedProj = () => {
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
          "http://localhost:8000/api/project/savedproject",
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

  const saves = data.savedProjects || [];
  //console.log(saves);

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="flex flex-col items-center">
        <div className="flex-row justify-center gap-6 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <a href="/home">
            <div className="flex flex-row">
              <div className="bg-white shadow-md rounded-lg border-l-4 border-indigo-600 p-6 w-[300px] h-[150px] my-4 transition-transform duration-200 hover:scale-105 relative">
                <div className="flex-grow flex justify-center items-center">
                  {/* Adding the plus symbol icon here */}
                  <div className="text-4xl text-indigo-600">Browse</div>
                </div>
              </div>
            </div>
          </a>
          {saves.length > 0 ? (
            saves.map((element, index) => (
              <SavedProjCards
                key={index}
                id={element._id}
                college={element.collegename}
                project={element.projectname}
                year={element.year}
                slots={element.availableSlots}
                roles={element.roles}
                technology={element.technology}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">
                  No Saved Projects
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  It looks like you haven't saved any projects yet.
                </p>
                <p className="mt-2 text-lg text-gray-600">
                  Browse projects to find one to save!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedProj;

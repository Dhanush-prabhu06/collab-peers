import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectDetailCard = (props) => {
  const id = props.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [file, setFile] = useState(null); // File input state
  const [description, setDescription] = useState(""); // Description input state

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
  }, [id]);

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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectname", projData.projectname);
    formData.append("receiveremail",projData.email);
    formData.append("description", description);

    if (file) {
      formData.append("file", file); // Append file only if it's selected
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8000/api/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Application submitted successfully:", response.data);
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error submitting application:", error);
    }
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

        <div className="mt-6 flex justify-center">
          <button
            className="bg-indigo-500 w-32 text-[#ffff] h-14 rounded-lg"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Apply now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Apply for the Project
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">About Yourself</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Resume (Optional)</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 p-2"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Skills = (props) => {
  const data = props.roles || []; // Fallback to empty array if roles is undefined
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((element, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded">
          {element}
        </div>
      ))}
    </div>
  );
};

const Technologies = (props) => {
  const data = props.technology || [];
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((element, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded">
          {element}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetailCard;

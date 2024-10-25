import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const MyprojectCards = (props) => {
  const navigate = useNavigate();

  const [showEditLabel, setShowEditLabel] = useState(false);
  const [showDeleteLabel, setShowDeleteLabel] = useState(false);

  const handleEdit = () => {
    navigate("/edit-project", {
      state: {
        project_id: props.id,
        project_name: props.project_name,
        description: props.description,
        availableSlots: props.slots,
        roles: props.roles,
        technology: props.technology,
        deadline: props.deadline,
      },
    });
  };

  const deleteProject = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/project/delete/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project deleted successfully:", response.data);
      alert("Project deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the project:", error);
    }
  };

  const showDetails = () => {
    navigate(`/details/${props.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg border-l-4 border-indigo-600 p-6 w-[300px] my-4 transform transition-transform duration-200 hover:scale-105">
      <div className="flex justify-end mb-4 gap-5">
        {/* Edit Icon */}
        <div
          onMouseEnter={() => setShowEditLabel(true)}
          onMouseLeave={() => setShowEditLabel(false)}
          onClick={handleEdit}
          className="hover:cursor-pointer flex items-center gap-1 text-blue-600 transform transition-transform duration-200 hover:scale-125 relative"
        >
          <FaRegEdit />
          {showEditLabel && (
            <div className="absolute top-[-20px] bg-gray-700 text-white text-sm p-1 rounded shadow-lg">
              Edit
            </div>
          )}
        </div>
        {/* Delete Icon */}
        <div
          onMouseEnter={() => setShowDeleteLabel(true)}
          onMouseLeave={() => setShowDeleteLabel(false)}
          onClick={deleteProject}
          className="hover:cursor-pointer flex items-center gap-1 text-red-600 transform transition-transform duration-200 hover:scale-125 relative"
        >
          <MdDeleteOutline />
          {showDeleteLabel && (
            <div className="absolute top-[-20px] bg-gray-700 text-white text-sm p-1 rounded shadow-lg">
              Delete
            </div>
          )}
        </div>
      </div>
      <div
        onClick={showDetails}
        className="hover:cursor-pointer text-center items-center text-lg font-semibold text-gray-800 mb-2"
      >
        {props.project_name}
      </div>
    </div>
  );
};

export default MyprojectCards;

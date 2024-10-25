import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imge from "../images/imge.jpg"; // Correct image import

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", JSON.stringify(formData, null, 2));
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
      const Data = response.data;

      if (response.status === 201) {
        window.alert("Login Successful");
        localStorage.setItem("authToken", Data.token);
        localStorage.setItem("username", Data.user.username);

        navigate("/home");
      } else {
        window.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error occurred during signin:", error.message);
      window.alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side with image */}
        <div className="w-1/2 hidden md:block bg-blue-100">
          <img
            src={imge}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side with the form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500  text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Sign In
            </button>
            <p className="text-gray-600 text-sm text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

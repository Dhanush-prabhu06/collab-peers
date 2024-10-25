import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const colleges = [
  "National Institute of Technology Karnataka, Surathkal",
  "RV College of Engineering, Bangalore",
  "BMS College of Engineering, Bangalore",
  "M.S. Ramaiah Institute of Technology, Bangalore",
  "PES University, Bangalore",
  "University Visvesvaraya College of Engineering, Bangalore",
  "Manipal Institute of Technology, Manipal",
  "International Institute of Information Technology, Bangalore",
  "Sir M Visvesvaraya Institute of Technology, Bangalore",
  "The National Institute of Engineering, Mysore",
  "Siddaganga Institute of Technology, Tumkur",
  "JSS Science and Technology University, Mysore",
  "KLE Technological University, Hubli",
  "Bangalore Institute of Technology, Bangalore",
  "Acharya Institute of Technology, Bangalore",
  "BNM Institute of Technology, Bangalore",
  "CMR Institute of Technology, Bangalore",
  "Dayananda Sagar College of Engineering, Bangalore",
  "New Horizon College of Engineering, Bangalore",
  "Nitte Meenakshi Institute of Technology, Bangalore",
  "Christ University Faculty of Engineering, Bangalore",
  "Bapuji Institute of Engineering and Technology, Davanagere",
  "Reva University, Bangalore",
  "SJB Institute of Technology, Bangalore",
  "Don Bosco Institute of Technology, Bangalore",
  "MVJ College of Engineering, Bangalore",
  "MS Engineering College, Bangalore",
  "PES College of Engineering, Mandya",
  "Srinivas Institute of Technology, Mangalore",
  "Canara Engineering College, Mangalore",
  "Jain University Faculty of Engineering, Bangalore",
  "KLS Gogte Institute of Technology, Belgaum",
  "Sri Jayachamarajendra College of Engineering, Mysore",
  "Vidya Vikas Institute of Engineering and Technology, Mysore",
  "Alva’s Institute of Engineering and Technology, Mangalore",
  "Sri Venkateshwara College of Engineering, Bangalore",
  "East West Institute of Technology, Bangalore",
  "AMC Engineering College, Bangalore",
  "KS Institute of Technology, Bangalore",
  "RNS Institute of Technology, Bangalore",
  "Tontadarya College of Engineering, Gadag",
  "Sahyadri College of Engineering and Management, Mangalore",
  "St. Joseph Engineering College, Mangalore",
  "Cambridge Institute of Technology, Bangalore",
  "Global Academy of Technology, Bangalore",
  "Nagarjuna College of Engineering and Technology, Bangalore",
  "NIE Institute of Technology, Mysore",
  "BGS Institute of Technology, Mandya",
  "Oxford College of Engineering, Bangalore",
  "Vemana Institute of Technology, Bangalore",
  "Sri Krishna Institute of Technology, Bangalore",
  "Basaveshwar Engineering College, Bagalkot",
  "Government Engineering College, Haveri",
  "Government Engineering College, Ramanagara",
  "Government Engineering College, Raichur",
  "Government Engineering College, Mandya",
  "Government Engineering College, Karwar",
  "Government Engineering College, Koppal",
  "Government Engineering College, Hassan",
  "Government Engineering College, Kushalnagar",
  "Government Engineering College, Chamarajanagar",
  "Government Engineering College, Chikkaballapur",
  "HKBK College of Engineering, Bangalore",
  "Adichunchanagiri Institute of Technology, Chikmagalur",
  "Ballari Institute of Technology and Management, Ballari",
  "BLDEA’s Vachana Pitamaha Dr. PG Halakatti College of Engineering and Technology, Vijayapura",
  "Shree Devi Institute of Technology, Mangalore",
  "Malnad College of Engineering, Hassan",
  "AIeMS Group of Institutions, Bangalore",
  "Impact College of Engineering and Applied Sciences, Bangalore",
  "Vivekananda College of Engineering and Technology, Puttur",
  "Srinivas School of Engineering, Mangalore",
  "Srinivas Institute of Technology, Valachil",
  "GSSS Institute of Engineering and Technology for Women, Mysore",
  "Rajeev Institute of Technology, Hassan",
  "East Point College of Engineering and Technology, Bangalore",
  "Ballari Institute of Technology, Ballari",
  "Jain College of Engineering, Belgaum",
  "Global College of Engineering, Bangalore",
  "SLN College of Engineering, Raichur",
  "Sri Siddhartha Institute of Technology, Tumkur",
  "SDM College of Engineering and Technology, Dharwad",
  "Sambhram Institute of Technology, Bangalore",
  "Alpha College of Engineering, Bangalore",
  "MS College of Engineering, Bangalore",
  "Nandi Institute of Technology and Management Sciences, Bangalore",
  "T John Institute of Technology, Bangalore",
  "Yellamma Dasappa Institute of Technology, Bangalore",
  "Rajeev Gandhi Memorial College of Engineering and Technology, Nandyal",
  "Coorg Institute of Technology, Kodagu",
  "Guru Nanak Dev Engineering College, Bidar",
  "Vidya Vardhaka College of Engineering, Mysore",
  "Vijayanagara College of Engineering, Ballari",
  "Sridevi Institute of Technology, Tumkur",
  "Akshaya Institute of Technology, Tumkur",
  "KNS Institute of Technology, Bangalore",
  "CMR University, Bangalore",
  "Brindavan College of Engineering, Bangalore",
  "KLE Dr. M S Sheshgiri College of Engineering and Technology, Belgaum",
  "Shridevi Institute of Engineering and Technology, Tumkur",
  "Dr. Ambedkar Institute of Technology, Bangalore",
  "Dayananda Sagar Academy of Technology and Management, Bangalore",
  "Alliance University, Bangalore",
  "Bangalore Technological Institute, Bangalore",
  "Sapthagiri College of Engineering, Bangalore",
  "Karnataka College of Engineering, Dharwad",
  "APS College of Engineering, Bangalore",
  "Gopalan College of Engineering and Management, Bangalore",
  "Rajarajeswari College of Engineering, Bangalore",
  "R.V. Institute of Technology and Management, Bangalore",
  "PES Institute of Technology, South Campus, Bangalore",
  "Sri Krishna College of Engineering & Technology, Bangalore",
  "Pooja Doddappa Appa College of Engineering, Gulbarga",
  "Veerappa Nisty Engineering College, Shorapur",
];
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    collegename: "",
    year: "",
    course: "",
  });

  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "collegename") {
      if (value === "") {
        setShowDropdown(false);
        setFilteredColleges([]);
      } else {
        const filteredList = colleges.filter((college) =>
          college.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredColleges(filteredList);
        setShowDropdown(true);
      }
    }
  };

  const handleCollegeSelect = (college) => {
    setFormData({ ...formData, collegename: college });
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", JSON.stringify(formData, null, 2));
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
      toast.success("Registration successful Please login!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Backend responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="mt-10 text-2xl font-semibold text-gray-700 mb-6 text-center">
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">College Name:</label>
          <input
            type="text"
            name="collegename"
            value={formData.collegename}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            autoComplete="off"
          />
          {showDropdown && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college, index) => (
                  <li
                    key={index}
                    onClick={() => handleCollegeSelect(college)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  >
                    {college}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No colleges found</li>
              )}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year:</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <p className="text-gray-600 text-sm text-center">
            Already have an account?
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

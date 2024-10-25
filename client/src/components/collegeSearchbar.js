import React, { useState } from "react";

// Sample college data (replace this with actual data or fetch from API)
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
  "Veerappa Nisty Engineering College, Shorapur"
];

const CollegeSearchBar = ({ searchedCollege, setSearchedCollege }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle change in search input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = colleges.filter((college) =>
        college.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (college) => {
    setSearchTerm(college);
    setSuggestions([]);
  };

  // Handle search button click (update searchedCollege in parent component)
  const handleSearchClick = () => {
    setSearchedCollege(searchTerm); // Update the state in Home component
    setSearchTerm("");
  };

  return (
    <div className="relative w-80 mx-auto">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search colleges"
          value={searchTerm}
          onChange={handleInputChange}
          className="p-3 border  border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button
          onClick={handleSearchClick}
          className="p-3 bg-indigo-600 text-[#FFFF] rounded-lg shadow hover:bg-slate-50 hover:text-[#6366F1] transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {suggestions.map((college, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(college)}
              className="p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 transition-colors"
            >
              {college}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollegeSearchBar;

// Home.js
import React, { useState, useEffect } from "react";
import Cards from "../cards-dir/cards";
import axios from "axios";
import CollegeSearchBar from "../components/collegeSearchbar";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the searched college and selected year
  const [searchedCollege, setSearchedCollege] = useState("");
  const [year, setYear] = useState("All"); // Initialize to 'All'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllProjects"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  //console.log('Data from API:', users.getAll);
  const data = users.getAll || [];

  //console.log('Data from API:', data);

  const filteredData = data.filter((element) => {
    const matchesCollege =
      searchedCollege === "" ||
      searchedCollege === "All" ||
      element.collegename === searchedCollege;

    const matchesYear = year === "All" || String(element.year) === String(year);

    // console.log(`Filtering - Project Year: ${element.year}, Selected Year: ${year}, Matches: ${matchesYear}`);

    return matchesCollege && matchesYear;
  });
  const selectAllCol = (college) => {
    setSearchedCollege(college);
  };
  //console.log('Filtered Data:', filteredData);

  return (
    <>
      <div className="sticky top-[60px] z-48 bg-white flex justify-center gap-48 items-center py-4 shadow-md">
        <div>
          {/* Pass setYear to YearDashBoard */}
          <YearDashBoard setYear={setYear} />
        </div>
        <div>
          {/* Pass the searchedCollege and setSearchedCollege to CollegeSearchBar */}
          <CollegeSearchBar
            searchedCollege={searchedCollege}
            setSearchedCollege={setSearchedCollege}
          />
        </div>
        <div
          className="hover:cursor-pointer hover:text-[#6366F1]"
          onClick={() => selectAllCol("All")}
        >
          Select all Colleges
        </div>
      </div>

      <div className="mt-10 z-0">
        {/* Display the selected college and year */}
        <h3 className="sticky top-[180px] z-50 text-[#6366F1]">
          selected college: {searchedCollege || "All Colleges"}
        </h3>
        <h4 className="sticky top-[200px] z-50 text-[#6366F1]">
          Selected Year: {year || "All Years"}
        </h4>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredData.length > 0 ? (
          filteredData.map((element, index) => (
            <Cards
              key={index}
              Project_name={element.projectname}
              college_name={element.collegename}
              availableSlots={element.availableSlots}
              expire_date={element.deadline}
              year={element.year}
              roles={element.roles}
              technology={element.technology}
              id = {element._id}
            />
          ))
        ) : (
          <p className="text-[#6366F1]">No projects found</p>
        )}
      </div>
    </>
  );
};

// YearDashBoard component to handle year selection
const YearDashBoard = ({ setYear }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  // Store selected year in parent Home component
  const storeYear = (selectedYear) => {
    setYear(selectedYear); // Set the selected year in the Home component
    setIsDashboardOpen(false); // Close the dashboard after selection
  };

  // Close dashboard when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDashboardOpen && !e.target.closest(".dashboard")) {
        setIsDashboardOpen(false);
      }
    };

    if (isDashboardOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDashboardOpen]);

  return (
    <div
      className="relative hover:cursor-pointer hover:text-[#6366F1] hover:underline"
      onClick={(e) => {
        e.stopPropagation(); // Prevents closing the dashboard when clicking on 'click'
        toggleDashboard();
      }}
    >
      Select Year
      {isDashboardOpen && (
        <div
          className="dashboard absolute top-full mt-2 w-40 p-4 shadow-lg mr-96  bg-slate-50 rounded-sm"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dashboard from closing it
        >
          <div className="flex flex-row justify-between  w-auto">
            <div onClick={() => storeYear("1")}>1</div>
            <div onClick={() => storeYear("2")}>2</div>
            <div onClick={() => storeYear("3")}>3</div>
            <div onClick={() => storeYear("4")}>4</div>
            <div onClick={() => storeYear("All")}>All</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

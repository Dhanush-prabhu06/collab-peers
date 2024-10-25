import React from 'react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">Connect & Conquer</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-50 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Find Your Perfect Team</h2>
          <p className="text-lg text-gray-600 mb-8">
            Connect with students from your college or across different institutions to collaborate on exciting projects and competitions.
          </p>
          <a
            href="/login"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Find a Team</h3>
            <p className="text-gray-600 mt-2">Search and filter through teams looking for new members.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Find a Teammate</h3>
            <p className="text-gray-600 mt-2">Connect with students who share your interests and goals.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Filter by College</h3>
            <p className="text-gray-600 mt-2">Narrow down your search to find people from your college.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2024 Connect & Conquer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;

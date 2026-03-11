import React from "react";
import { Link } from "react-router-dom";

const WhyNivas = () => {
  return (
    <div className="bg-slate-200 min-h-screen">

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Why Choose Nivas 360?
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Smarter. Safer. Simpler property search experience.
        </p>
      </div>

      {/* Problem vs Solution */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-red-500">
            Problems You Face
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>❌ Fake Listings</li>
            <li>❌ No Proper Details</li>
            <li>❌ Middleman Confusion</li>
            <li>❌ Slow Response</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Our Solution
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✅ Verified Properties</li>
            <li>✅ Complete Information</li>
            <li>✅ Direct Owner Contact</li>
            <li>✅ Quick Enquiry Support</li>
          </ul>
        </div>

      </div>

      {/* Features Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            What Makes Us Different?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

            <div className="bg-blue-900 p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-2">Verified Listings</h3>
              <p className="text-sm">
                Every property is checked before publishing.
              </p>
            </div>

            <div className="bg-blue-900 p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-2">Direct Contact</h3>
              <p className="text-sm">
                No unnecessary brokers in between.
              </p>
            </div>

            <div className="bg-blue-900 p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-2">Smart Filters</h3>
              <p className="text-sm">
                Search by price, location, type easily.
              </p>
            </div>

            <div className="bg-blue-900 p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-2">Fast Response</h3>
              <p className="text-sm">
                Quick enquiry & callback support.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">
          Start Your Property Search Today
        </h2>

        <Link to="/">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded text-lg font-semibold">
            Explore Properties
          </button>
        </Link>
      </div>

    </div>
  );
};

export default WhyNivas;
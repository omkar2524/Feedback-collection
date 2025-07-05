import React, { useState, useEffect } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    rating: "",
    comment: "",
  });

  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    // Load feedback from localStorage on component mount
    const feedbackFromLS = JSON.parse(localStorage.getItem("feedback")) || [];
    setAllFeedback(feedbackFromLS);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the feedback to localStorage
    const updatedFeedback = [...allFeedback, formData];
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
    setAllFeedback(updatedFeedback);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      feedbackType: "",
      rating: "",
      comment: "",
    });
  };

  // Group feedbacks by type and calculate average rating
  const groupFeedbackByType = () => {
    const groupedFeedback = {};

    allFeedback.forEach((feedback) => {
      const type = feedback.feedbackType;

      if (!groupedFeedback[type]) {
        groupedFeedback[type] = { totalRating: 0, count: 0 };
      }
      groupedFeedback[type].totalRating += parseInt(feedback.rating);
      groupedFeedback[type].count += 1;
    });

    return groupedFeedback;
  };

  const groupedFeedback = groupFeedbackByType();

  return (
    <div className="flex container mx-auto flex-col lg:flex-col items-center gap-8 p-4 md:p-8">
      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 w-full lg:w-[40%] h-fit  mx-auto flex flex-col gap-4 bg-gradient-to-r from-purple-500 to-purple-900  text-black rounded-lg shadow-md"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Feedback Form
        </h1>

        {/* Feedback Type */}
        <select
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleChange}
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="">Select Feedback Type</option>
          <option value="Delivery">Delivery</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Product Quality">Product Quality</option>
          <option value="Website Experience">Website Experience</option>
          <option value="App Experience">App Experience</option>
          <option value="Pricing">Pricing</option>
          <option value="Usability">Usability</option>
          <option value="Features">Features</option>
          <option value="Performance">Performance</option>
          <option value="Design">Design</option>
          <option value="Content">Content</option>
          <option value="Functionality">Functionality</option>
          <option value="Accessibility">Accessibility</option>
          <option value="Other">Other</option>
        </select>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Full Name"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        />

        {/* Comment */}
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your comment"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        ></textarea>

        {/* Rating */}
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="">Rate us (1-5) : </option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Feedback Display */}
      <div className="w-full lg:w-[60%] bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center ">
          Feedback Received {allFeedback.length}
        </h2>

        {/* Average Rating for Each Type */}
        <div className="flex flex-wrap justify-center gap-6 text-center mx-auto w-full ">
          {Object.keys(groupedFeedback).length > 0 ? (
            Object.keys(groupedFeedback).map((type) => {
              console.log(groupedFeedback);
              const averageRating = (
                groupedFeedback[type].totalRating / groupedFeedback[type].count
              ).toFixed(2);
              return (
                <div
                  key={type}
                  className="bg-white text-black p-4 rounded-lg shadow-md w-[200px]"
                >
                  <h3 className="text-lg font-bold mb-2">{type}</h3>
                  <p>
                    <strong>Average Rating:</strong> {averageRating}
                  </p>
                  <p className="font-semibold capitalize mt-2">
                    total feedback: <span>{groupedFeedback[type].count}</span>
                  </p>
                </div>
              );
            })
          ) : (
            <p>No feedback available yet.</p>
          )}
        </div>

        {/* All Feedback List */}
        <div className="mt-6">
          {allFeedback.map((feedback, index) => {
            return (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-md shadow-md mb-4"
              >
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Feedback Type:</strong> {feedback.feedbackType}
                </p>
                <p>
                  <strong>Rating:</strong> {feedback.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {feedback.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feedback;

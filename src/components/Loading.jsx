import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      
      {/* Text */}
      <p className="mt-4 text-white text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;

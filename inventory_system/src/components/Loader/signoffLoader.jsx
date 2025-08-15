import React from "react";

const SignOffLoader = ({ message = "Signing out..." }) => {
  return (
    <div className="fixed inset-0  bg-black/30 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 shadow-lg">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default SignOffLoader;

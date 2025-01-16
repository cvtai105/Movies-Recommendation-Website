import React from "react";

const About = () => {
  const members = [
    { id: "21120500", name: "Mai Văn Minh" },
    { id: "21120541", name: "Hoàng Văn Quốc" },
    { id: "21120550", name: "Chu Văn Tài" },
  ];

  const handleGoHome = () => {
    // Điều hướng về trang chủ
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-8 text-center px-4">
        Thông tin về các thành viên trong nhóm thực hiện dự án
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full px-8 sm:px-20">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white text-black rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-700 mt-2">MSSV: {member.id}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleGoHome}
        className="mt-10 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-colors"
      >
        Trở về Trang chủ
      </button>
    </div>
  );
};

export default About;
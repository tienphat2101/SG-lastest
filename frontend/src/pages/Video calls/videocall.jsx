import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Sử dụng icon arrow để giống nút tìm kiếm

const Videocall = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      window.open('https://video-call-mumble.vercel.app/', '_blank');
    }, 300); // Thời gian animation
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <button
        onClick={handleClick}
        className={`flex items-center bg-[#87DF2C] text-white px-4 py-2 rounded-md text-sm font-bold transition-transform duration-300 ease-in-out transform ${isClicked ? 'scale-95 opacity-80' : ''} hover:bg-[#66c22f] shadow-md hover:shadow-lg`}
      >
        Connect to SmartRoom
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default Videocall;

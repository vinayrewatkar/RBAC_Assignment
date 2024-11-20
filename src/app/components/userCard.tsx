import React from "react";

const UserCard = () => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[100px]">
      {/* User Status Indicator */}
      <div
        className={`absolute top-2 right-2 flex items-center gap-2 text-xs text-green-400`}
      >
        <div className={`w-2 h-2 rounded-full bg-green-400`} />
        Active
      </div>

      <div className="relative z-10 text-center">
        <div className="text-2xl font-bold mb-1">John Doe</div>
        <div className="text-sm text-gray-400">Software Engineer</div>
        <div className="text-xs mt-2">Email: johndoe@example.com</div>
        <div className="text-xs text-gray-500 mt-1">Joined: Jan 12, 2023</div>
      </div>

      {/* Status Bar */}
      <div className={`absolute right-0 top-0 bottom-0 w-1 bg-green-400`} />

      {/* Background Pulse Effect */}
      <div className={`absolute inset-0 bg-green-400 opacity-5`}>
        <div className="absolute inset-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default UserCard;

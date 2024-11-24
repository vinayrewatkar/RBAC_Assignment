// components/DashboardStats.tsx
import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';

interface DashboardStatsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalUsers,
  activeUsers,
  inactiveUsers
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-gray-400 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <UserCheck className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-gray-400 text-sm">Active Users</h3>
            <p className="text-2xl font-bold">{activeUsers}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <UserX className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-gray-400 text-sm">Inactive Users</h3>
            <p className="text-2xl font-bold">{inactiveUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
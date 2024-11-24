"use client";
import React, { useState } from "react";
import { useRoles } from "../../../../store/rolesContext";
import { RoleFormModal } from "./roleModals";
import { Role } from "../../../../types/role";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { format } from "date-fns";

export const RoleTable: React.FC = () => {
  const { roles, deleteRole } = useRoles();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Confirm before deleting a role
  const handleDelete = (role: Role) => {
    if (window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      deleteRole(role.id);
    }
  };

  // Open the modal for adding or editing a role
  const openModal = (role?: Role) => {
    setSelectedRole(role || null);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  // Filter roles based on search query
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
        {/* Roles Title */}
        <h2 className="text-xl font-semibold text-white">Roles</h2>

        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-md bg-black text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Add Role Button */}
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-200">
            {filteredRoles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-300">{role.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">{role.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {permission.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {format(new Date(role.createdAt), "MM/dd/yyyy")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openModal(role)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Form Modal */}
      {showModal && (
        <RoleFormModal
          initialRole={selectedRole || undefined}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

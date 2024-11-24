"use client";
import React, { useState } from "react";
import { Role } from "../../../../types/role";
import { useRoles } from "../../../../store/rolesContext";

interface RoleFormModalProps {
  initialRole?: Role;
  onClose: () => void;
}

export const RoleFormModal: React.FC<RoleFormModalProps> = ({
  initialRole,
  onClose,
}) => {
  const { permissions, addRole, updateRole } = useRoles();
  const [formData, setFormData] = useState({
    name: initialRole?.name || "",
    description: initialRole?.description || "",
    permissions: initialRole?.permissions.map((p) => p.id) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPermissions = permissions.filter((p) =>
      formData.permissions.includes(p.id)
    );

    const roleData = {
      name: formData.name,
      description: formData.description,
      permissions: selectedPermissions,
    };

    if (initialRole) {
      updateRole({ ...initialRole, ...roleData });
    } else {
      addRole(roleData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {initialRole ? "Edit Role" : "Add New Role"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Role Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md bg-black text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md bg-black text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => {
                      const newPermissions = e.target.checked
                        ? [...formData.permissions, permission.id]
                        : formData.permissions.filter((id) => id !== permission.id);
                      setFormData({ ...formData, permissions: newPermissions });
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-200">
                    {permission.name} - {permission.description}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {initialRole ? "Update Role" : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

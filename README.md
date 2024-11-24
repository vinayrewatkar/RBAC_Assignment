# NextJS Admin Dashboard Documentation

## Overview

This admin dashboard application provides a comprehensive interface for managing users, roles, and permissions. Built with Next.js 14+, the dashboard offers a secure and intuitive way for administrators to handle user management, role assignments, and permission controls.

## Key Features

1. **User Management**
   - Complete CRUD operations for user accounts
   - User status management (Active/Inactive)
   - Role assignment interface
   - Bulk user operations

2. **Role Management**
   - Role creation and modification
   - Permission assignment to role.
   - Custom attribute support

3. **Permission System**
   - Granular permission controls
   - Dynamic permission assignment
   - Permission inheritance
   - Access level visualization

## Prerequisites

1. **Node.js**: Version 18.17 or later
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Package Manager**: npm (included with Node.js) or yarn
   - If using yarn, install it via: `npm install -g yarn`

## Project Structure

```bash
RBAC_Assignment/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── (pages)/
│   │       ├── dashboard/
│   │       ├── roles/
│   │       └── users/
│   │   ├── components/
│   │   ├── fonts/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── globals.css
│   │   ├── layout-client.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
└── package.json
```

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vinayrewatkar/RBAC_Assignment.git
   cd RBAC_Assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Core Features Documentation

### User Management

The user management system provides the following capabilities:

- **User Creation**: Add new users with basic information and role assignment
- **User Editing**: Modify user details, status, and role associations
- **User Deletion**: Remove users with proper authorization
- **Status Management**: Toggle user status between Active and Inactive
- **Role Assignment**: Assign multiple roles to users with visual feedback

### Role Management

The role management interface allows:

- **Role Definition**: Create and modify roles with custom attributes
- **Permission Assignment**: Assign granular permissions to roles
- **Role Analysis**: View role usage and permission overview

### Permission System

The permission system includes:

- **Permission Types**: 
  - Read: View access to resources
  - Write: Create and modify resources
  - Delete: Remove resources
  - Custom: Define specialized permissions
- **Access Control**: Fine-grained control over feature access

## Development Guidelines

1. **Code Style**
   - Follow provided ESLint configuration
   - Use TypeScript for type safety
   - Implement proper error handling

2. **Component Structure**
   - Use atomic design principles
   - Implement proper prop validation
   - Follow React best practices

3. **State Management**
   - Utilize React Context for global state
   - Implement proper loading states
   - Handle errors gracefully

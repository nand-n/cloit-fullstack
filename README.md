# CloIT Fullstack Project

**CloIT** is a fully functional, full-stack web application that focuses on managing **Menus** and **System Settings** in an organized and hierarchical manner. It is built using modern web technologies such as **Next.js** on the frontend and **NestJS** on the backend, with **PostgreSQL** as the database and **Prisma** ORM for database interactions. The project is designed for scalability, ease of deployment, and fast performance, leveraging **CI/CD** pipelines and containerization.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Continuous Integration & Deployment](#continuous-integration--deployment)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project was built to demonstrate how to implement a **System Management** interface where administrators can manage different system configurations such as **Menu Hierarchies**, **System Codes**, and more. The app allows users to perform CRUD (Create, Read, Update, Delete) operations on menus, which are structured hierarchically.

The app is fully deployed and includes a backend API connected to a PostgreSQL database, which is served through **Koyeb** using Docker. The frontend is deployed on **Vercel**.

Both the frontend and backend are written in **TypeScript**, ensuring type safety and clean, maintainable code.

## Features

### Menu Management

- **Dynamic Menu Creation**: Add, edit, and delete menus with various depths in a hierarchical system.
- **Hierarchical Display**: Menus are displayed in a tree-like structure for easy management.
- **Expand/Collapse**: Users can expand or collapse sections of the menu for easy navigation.
- **Parent/Child Relationship**: Menus can be nested with parent-child relationships for better organization.

### System Code Management

- Manage system codes that are essential for various system configurations.
- CRUD operations for system codes.

### User & Group Management

- Administrators can manage users and groups, register new users, and assign roles and permissions.

### API Management

- CRUD operations for API registration, allowing system to manage and configure system APIs.

## Technology Stack

### Frontend

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app) – Enables server-side rendering and static site generation.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for quick and responsive UI design.
- **State Management**: [Redux](https://redux.js.org/), [Redux-Saga](https://redux-saga.js.org/), and [Redux Toolkit](https://redux-toolkit.js.org/) for managing complex state logic and asynchronous operations.
- **API Handling**: [Axios](https://axios-http.com/) – Used for making API requests from the frontend to the backend services.
- **TypeScript**: Ensures type safety and better tooling with VSCode and other editors.
- **Deployment**: Deployed on [Vercel](https://vercel.com/).

### Backend

- **Framework**: [NestJS](https://nestjs.com/) – A powerful framework for building scalable server-side applications using TypeScript.
- **Database**: [PostgreSQL](https://www.postgresql.org/) – A powerful, open-source relational database.
- **ORM**: [Prisma](https://www.prisma.io/) – Enables database schema management and interaction in an elegant way with TypeScript support.
- **Authentication**: JWT-based authentication for secure API access.
- **Docker**: Used to containerize the backend application for deployment.
- **Continuous Integration**: CI/CD pipeline via GitHub Actions.
- **Deployment**: Deployed on [Koyeb](https://www.koyeb.com/) using a Docker image pushed to Docker Hub.

## Architecture

The project follows a **microservice-like architecture** by decoupling the frontend and backend:

- The **Frontend** (Next.js) communicates with the **Backend** (NestJS) via RESTful APIs.
- The **Backend** handles all the business logic, database interactions, and authentication/authorization.
- The **CI/CD** process ensures smooth updates and delivery of new features without downtime.

The backend is containerized using **Docker**, ensuring that it can run reliably across different environments. The frontend is deployed separately, allowing for fast updates and independent scaling.

## Project Structure

```bash
├── Frontend                  # Next.js App
│   ├── public                # Public Assets
│   ├── src
│   │   ├── app
│   │   │   ├── api
│   │   │   ├── menus
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components        # Common UI Components
│   │   │   └── common
│   │   │       ├── breadCramp.tsx
│   │   │       ├── breadCrampWithIcon.tsx
│   │   │       ├── icon.tsx
│   │   │       ├── toastMessage.tsx
│   │   │       └── sideBar.tsx
│   │   ├── lib                # Providers
│   │   │   ├── antdProvider.tsx
│   │   │   └── storeProvider.tsx
│   │   ├── store              # State Management
│   │   │   ├── features
│   │   │   │   ├── categories
│   │   │   │   ├── toast
│   │   │   │   └── treeSlice
│   │   │   ├── hook.ts
│   │   │   ├── rootSaga.ts
│   │   │   └── store.ts
│   │   ├── types              # TypeScript Types
│   │   └── utils              # Utilities and Configuration
│       ├── next-env.d.ts
│       ├── tailwind.config.ts
│       ├── postcss.config.ts
├── Backend                  # NestJS App
│   ├── prisma               # Prisma DB Migrations
│   │   └── schema.prisma
│   ├── src
│   │   ├── app
│   │   │   ├── modules
│   │   │   │   ├── category
│   │   │   │   │   ├── dto
│   │   │   │   │   ├── category.controller.ts
│   │   │   │   │   ├── category.module.ts
│   │   │   │   │   └── category.service.ts
│   │   │   ├── prisma
│   │   │   ├── core.module.ts
│   │   ├── config            # Application Configuration
│   │   │   ├── app.config.module.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── validation.ts
│   ├── test                  # Testing Files
│   ├── Dockerfile            # Docker Configuration
│   ├── docker-compose.yml
├── .github                  # CI/CD Workflows
    └── workflows
        └── docker-build.yaml
```

# ClientHub Frontend

React/TypeScript frontend for **ClientHub**, a full-stack CRM application that allows authenticated users to manage clients, track relationship activity, view dashboard metrics, and generate reports through a secured Spring Boot API.

The goal of this project is to demonstrate real frontend integration with a production-style backend: authentication, protected routes, API-driven state, form workflows, relational data, dashboard metrics, and deployment.

---

## Live Demo

- Live Application: https://clienthub-frontend-sigma.vercel.app/login
- Backend API: https://clienthub-api.onrender.com
- Swagger / OpenAPI: https://clienthub-api.onrender.com/swagger-ui/index.html

### Demo Account

```text
Email: demo@clienthub.com
Password: DemoPassword123!
```

The demo account includes seeded clients and activities so reviewers can immediately test the dashboard, client management, activity tracking, and report generation features.

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query / React Query
- Axios
- Tailwind CSS
- Vercel

---

## Core Features

- JWT-based login flow
- Demo login button
- Protected routes
- Authenticated API requests with Axios
- Dashboard with real backend-powered metrics
- Client listing and management
- Client detail pages
- Client activity timeline
- Activity creation, editing, and completion workflow
- Searchable client and activity reports
- Loading, error, and empty states
- Production deployment on Vercel

---

## Application Flow

```text
Login
  ↓
Dashboard
  ↓
Clients
  ↓
Client Detail
  ↓
Activities
  ↓
Reports
```

The frontend communicates with a secured backend API and uses the authenticated user's JWT token to access protected CRM data.

---

## Architecture

```text
React Pages
   ↓
Feature Components / Forms
   ↓
React Query Hooks
   ↓
Axios API Layer
   ↓
Spring Boot REST API
```

### Key Design Points

- Route-level pages are separated from reusable components.
- API calls are isolated in the `api` layer.
- TypeScript models define frontend data contracts.
- React Query manages server state, caching, and refetching.
- Axios handles authenticated requests.
- Protected routes prevent unauthenticated access to CRM pages.
- The dashboard uses real backend metrics instead of hardcoded placeholder values.

---

## Project Structure

```text
src/
├── api/          # Axios instance and API endpoint functions
├── components/   # Reusable UI components
├── context/      # Authentication context
├── hooks/        # Custom hooks
├── pages/        # Route-level pages
├── types/        # TypeScript data types
└── main.tsx      # Application entry point
```

---

## Main Pages

### Login

- Allows users to sign in with email and password
- Includes one-click demo login
- Stores JWT after successful authentication
- Redirects authenticated users to the dashboard

### Dashboard

Displays real user-scoped CRM metrics from the backend:

- total clients
- total activities
- open activities
- completed activities
- recent activity

### Clients

- Displays the authenticated user's clients
- Supports creating, editing, deleting, and viewing client records
- Shows validation and API error feedback

### Client Detail

- Displays selected client information
- Shows activity history for the selected client
- Supports creating, editing, and completing activities

### Reports

- Allows users to generate client and activity reports
- Supports searchable report results from the backend

---

## Environment Setup

Create a `.env` file in the project root:

```text
VITE_API_BASE_URL=http://localhost:8080
```

For production, Vercel uses the deployed backend URL:

```text
VITE_API_BASE_URL=https://clienthub-api.onrender.com
```

---

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Local frontend URL:

```text
http://localhost:5173
```

---

## Backend Dependency

This frontend consumes the ClientHub Spring Boot API.

The backend provides:

- JWT authentication
- protected client endpoints
- protected activity endpoints
- dashboard summary endpoint
- report generation endpoint
- validation and structured error responses

Backend repository: ClientHub API

---

## Deployment

The frontend is deployed on **Vercel**.

The backend is deployed separately on **Render**, with PostgreSQL hosted through Render.

Frontend production configuration requires:

```text
VITE_API_BASE_URL=https://clienthub-api.onrender.com
```

---

## Future Enhancements

- Improved toast notifications
- Loading skeletons
- Stronger form validation with React Hook Form and Zod
- Improved report UI
- Client search and filtering controls
- Pagination controls
- E2E testing with Playwright or Cypress
- Expanded frontend test coverage

---

## Project Purpose

ClientHub Frontend was built to demonstrate how a React application interacts with a secured backend API in a realistic business application.

It demonstrates:

- authenticated frontend workflows
- protected routing
- API integration
- server-state management
- relational data handling
- dashboard rendering from real backend metrics
- deployment-ready frontend configuration
- maintainable React project structure

---

## Author

Mason Dubelbeis

- GitHub: https://github.com/mdubelbeis
- Portfolio: https://www.masondubelbeis.com
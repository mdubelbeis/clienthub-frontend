# 🚀 Optional (HIGH IMPACT ADD)

If you want to go elite:

### Add this section at top:

```md
## 📸 Screenshots

🔥 Good — now we’re going from “solid project” → “hire this guy” signal.

This version is designed to:
	•	hook recruiters in the first 5 seconds
	•	clearly show value
	•	highlight your thinking, not just features
	•	feel like a real product, not a school project

⸻

🚀 RECRUITER-OPTIMIZED README

# ClientHub Frontend (React CRM UI)

A production-style React application that consumes a secure backend API to manage clients and track client interactions.

Built to demonstrate real-world frontend architecture, authenticated data flows, and scalable state management — not just basic CRUD.

---

## 🎯 Why This Project Exists

Most frontend projects stop at simple UI and mock data.

ClientHub is different.

This project focuses on:
- Real API integration with authentication
- Relational data (clients → activities)
- Production patterns (React Query, routing, layouts)
- Handling real-world edge cases (errors, auth expiry, invalid data)

👉 This is the kind of application you build on a real team.

---

## 🚀 Live Application Flow

Login → Dashboard → Clients → Client Detail → Activities

- Secure login with JWT
- View and manage clients
- Drill into a client to view activity history
- Add new activities with instant UI updates

---

## ✨ Core Features

### 🔐 Authentication & Security
- JWT-based authentication flow
- Protected routes using React Router
- Automatic redirect on login/logout
- Global 401 handling (auto logout + redirect)
- Axios interceptor injects auth headers

---

### 👤 Client Management
- Fetch and display client list from API
- Create new clients with validation
- Real-time UI updates after creation
- Duplicate client handling with inline error feedback

---

### 📋 Activity System (Relational Data)
- Activities tied to a specific client
- Fetch activities per client context
- Create new activities with automatic cache refresh
- Clean separation of client → activity relationship in UI

---

### ⚡ State Management (React Query)
- Server state handled via React Query
- Automatic caching and background refetching
- Query invalidation for real-time updates
- No manual state syncing or page reloads

---

### 🧠 UX & Error Handling
- Loading and error states handled across views
- Inline form validation and feedback
- Graceful handling of API failures
- Clean navigation flow across protected routes

---

## 🧱 Tech Stack

| Category        | Technology |
|----------------|-----------|
| Framework      | React (Vite) |
| Language       | TypeScript |
| Routing        | React Router v6 |
| State Mgmt     | React Query (TanStack) |
| HTTP Client    | Axios |
| Styling        | Tailwind CSS (or equivalent) |

---

## 🏗️ Architecture Highlights

### 🔁 Data Flow

API → React Query → Custom Hooks → UI Components

---

### 📁 Project Structure

src/
├── api/                # API layer (axios + endpoints)
├── features/           # Feature-based logic (React Query hooks)
├── components/         # Reusable UI components
├── components/forms/   # Form components
├── pages/              # Route-level pages
├── context/            # Auth state management
├── types/              # TypeScript models

---

### 🔐 Authentication Flow

Login → Store JWT → Attach to Requests → Access Protected Routes

- Token persisted in localStorage
- Axios interceptor handles auth automatically
- 401 responses trigger logout + redirect

---

## 🔄 Routing Structure

/                → Login
/dashboard       → Dashboard (protected)
/clients         → Client list
/clients/:id     → Client detail + activities

- `ProtectedRoute` enforces authentication
- `AppLayout` provides consistent UI shell
- `<Outlet />` used for nested routing

---

## 🧪 Real Problems Solved

This project intentionally handles real-world issues:

- Preventing duplicate client creation
- Handling expired authentication tokens
- Syncing UI with server state after mutations
- Managing relational data across multiple views
- Avoiding unnecessary re-renders and refetches

---

## ⚙️ Environment Setup

Create a `.env` file:

VITE_API_BASE_URL=http://localhost:8080

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```
⸻

## 🔌 Backend Dependency

This frontend consumes a secured REST API that provides:
	•	JWT authentication
	•	Client management endpoints
	•	Activity tracking endpoints

Backend repository available separately if needed.

⸻

## 🚧 Future Enhancements

### Product Features
	•	Edit/update client
	•	Delete activities
	•	Client search and filtering
	•	Pagination controls

⸻

UX Improvements
	•	Toast notifications (success/error)
	•	Loading skeletons
	•	Improved visual design (cards/tables)
	•	Better empty states

⸻

### Engineering Improvements
	•	React Hook Form + Zod validation
	•	Stronger API typing
	•	Global error handling abstraction
	•	E2E and integration testing

⸻

## 💡 What This Project Demonstrates
	•	Building a real frontend against a secured API
	•	Managing server state correctly (not just local state)
	•	Implementing authentication flows end-to-end
	•	Structuring scalable React applications
	•	Handling relational data in the UI layer

⸻

## 📌 Status

🚧 Actively Improving
Core functionality complete. Currently refining UX and adding advanced features.

⸻

## 👨‍💻 Author

Mason Dubelbeis
	•	GitHub: https://github.com/mdubelbeis
	•	Portfolio: https://www.masondubelbeis.com

⸻

## 🧠 Final Thought

This project is intentionally built to reflect how real applications are structured in production — focusing on architecture, data flow, and maintainability rather than just visuals.

---
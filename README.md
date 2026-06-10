# BrickSync — Stock & Inventory Management System

> MERN stack application for product inventory, transactions, vehicle fuel tracking and financial reporting.

## Project Overview

BrickSync is a full-stack Stock and Inventory Management System built with the MERN stack (MongoDB, Express, React, Node). The system provides product CRUD, inventory operations (restock/sell), transaction ledgering, vehicle & fuel expense tracking, daily financial summaries and PDF/report exports.

## Key Features
- Product management: create, update, delete products with price, quantity and aggregated revenue/expense fields.
- Inventory workflows: restock and sell endpoints that update product quantities and create transactions.
- Transaction ledger: record and view sales, purchases and other financial transactions with filtering.
- Financial reporting: daily summaries, total revenue/expenses and per-vehicle fuel spend visualised via charts.
- Vehicles & Fuel: CRUD for vehicles and fuel entry records; total spent per vehicle calculations.
- Authentication: email/password sign-up & sign-in, Google sign-in, JWT-based sessions (httpOnly cookie).
- Export & print: generate printable reports and PDF exports using html2canvas + jsPDF / react-to-print.

## Tech Stack
- Frontend: React, Vite, React Router, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth & Security: bcryptjs (password hashing), jsonwebtoken (JWT), httpOnly cookies
- Charts & Reports: Chart.js (react-chartjs-2), html2canvas, jsPDF
- HTTP client: axios

## Architecture & API Summary

Server base URL: `http://localhost:3000`

Authentication
- POST /api/auth/signup — create account
- POST /api/auth/signin — authenticate, returns httpOnly JWT cookie
- POST /api/auth/google — Google sign-in (creates user if missing)
- GET /api/auth/signout — clear cookie

Users
- PUT /api/user/update/:id — update user (protected)
- DELETE /api/user/delete/:id — delete user (protected)

Products
- POST /api/products/create (protected)
- GET /api/products/getproducts (protected)
- PUT /api/products/update/:productId/:userId (protected)
- DELETE /api/products/delete/:productId/:userId (protected)
- GET /api/products/total-revenue (protected)
- GET /api/products/total-expenses (protected)

Inventory
- POST /api/inventory/restock (protected)
- POST /api/inventory/sell (protected)

Transactions
- GET /api/transaction/gettransactions (protected)
- GET /api/transaction/create (protected)

Vehicles & Fuel
- Vehicle CRUD under `/api/vehicles/*` (protected)
- Fuel entries under `/api/fuels/*` and `/api/fuels/total-spent-per-vehicle` (protected)

Financials
- GET /api/financial/getDailySummary (protected)

Middleware: `verifyToken` validates the httpOnly JWT from `access_token` cookie for protected routes.

## Database Schemas (high level)
- users: { username, email, password(hashed), profilePicture, timestamps }
- products: { userId, name, description, price, quantity, totalRevenue, totalExpenses, timestamps }
- transactions: { entityName, entityType, transactionType, amount, userId (ObjectId), timestamps }
- vehicles: { userId, vehName, vehNumber, vehCategory, timestamps }
- fuels: { vehicleId (ObjectId), fuelQuantity, fuelPrice, userId (ObjectId), timestamps }

Notes: inventory quantities are tracked on `products.quantity`; financial aggregates are computed and stored/returned by controllers.

## Installation

Prerequisites: Node.js (16+ recommended), npm or Yarn, MongoDB instance (local or cloud).

Backend
```
cd backend
npm install
```

Frontend
```
cd frontend
npm install
```

## Environment variables
Create a `.env` file for the backend with at least:

- `MONGO` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs
- `NODE_ENV` — development/production

Frontend can use an `.env` for API base URL if desired (e.g., `VITE_API_BASE_URL`).

## Running the project (development)

Start backend (default port 3000):
```
cd backend
npm run dev   # or: node index.js via your preferred script
```

Start frontend (Vite, default port 5173):
```
cd frontend
npm run dev
```

Open the frontend in the browser and authenticate to exercise protected endpoints.

## Documentation
This repository includes separate project documentation describing API contracts, UI flows and data models. See the project documentation folder or internal docs for detailed API request/response examples, sequence diagrams and UI component mapping.

## Tests
No automated tests included in the initial submission. Add unit/integration tests (Jest, React Testing Library, Supertest) as needed.

## Contributing
- Create an issue describing the change or bug.
- Open a pull request with clear description and related issue reference.

If you want, I can add a `docs/` folder with API examples and example requests/responses.

## Contact
For questions about the implementation or to request specific README changes, open an issue or reach out to the project owner.

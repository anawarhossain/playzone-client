# Playzone Client

## Project Overview

**Playzone Client** is a Next.js-based web application for browsing, booking, and managing sports facilities. The app is designed to provide an interactive experience for users who want to find courts, fields, and play zones with available time slots and amenities.

## Purpose

The project enables users to:

- view sport facilities and venue details
- search and filter locations
- register and authenticate
- book available time slots
- manage facility listings and bookings through a dashboard

## Live URL

- https://anawarhossain-playzone.vercel.app/

## Features

- Facility browsing and detail pages
- Search filters and pagination
- User authentication with registration and login
- Booking workflow for selected time slots
- Facility management dashboard for owners/admins
- Responsive UI for desktop and mobile
- Animated interactions using motion components
- Notifications and toast messages

## Prerequisites

- Node.js 18+ (or the version supported by Next.js 16+)
- npm (or pnpm/yarn) to install dependencies
- A running backend API that the client talks to (see "Backend & Auth" below)

## Environment variables

Create a `.env.local` file in the project root and set these variables used by the client:

- `BACKEND_URL` — Base URL of the backend API (e.g. `http://localhost:4000`)
- `BETTER_AUTH_URL` — Base URL of the Better Auth server (if using a separate auth server)
- `MONGODB_CONNECTION_URL` — MongoDB connection URI (used by the embedded auth configuration)
- `DATABASE_NAME` — MongoDB database name used by the auth adapter
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — OAuth credentials for Google social login (optional)

Note: The client expects a separate backend API that exposes endpoints such as `/facilities` and `/booking`. Without a working backend and auth service the client will not be able to fetch or mutate data.

## Backend & Auth

- This repository is the frontend client. The server-side API and auth service are expected to run separately.
- The app uses `better-auth` and `@better-auth/mongo-adapter` for authentication. The auth client is configured to talk to `BETTER_AUTH_URL` and the auth server needs access to the MongoDB instance specified by `MONGODB_CONNECTION_URL` and `DATABASE_NAME`.
- If you don't have a production Better Auth instance, you can host one locally (see Better Auth docs) or point `BETTER_AUTH_URL` to your auth server.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with the required variables (see above).

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` — Run the app in development mode
- `npm run build` — Create an optimized production build
- `npm run start` — Start the production server after build
- `npm run lint` — Run ESLint

## Project Structure

## Key NPM Packages Used

- `next` — React framework for server-rendered web apps
- `react` and `react-dom` — UI library and DOM renderer
- `tailwindcss` — utility-first CSS framework
- `better-auth` and `@better-auth/mongo-adapter` — authentication and MongoDB adapter
- `mongodb` — MongoDB driver for database access
- `framer-motion` — animation library for UI motion
- `react-icons` — scalable icon components
- `react-toastify` — toast notifications
- `@heroui/react` and `@heroui/styles` — UI component styling and design system
- `clsx` — conditional class name helper
- `tailwind-merge` — merge Tailwind CSS class names safely

## Installation

```bash
npm install
npm run dev
```

## Project Structure

- `src/app/` — application routes and page components
- `src/components/` — reusable UI components
- `src/lib/` — client and server helper modules
- `public/` — static assets

## Contributing

- Feel free to open issues or pull requests for bugs and improvements.
- When contributing, describe how to reproduce the issue and include screenshots if applicable.

## Contact

If you need help running the project locally or want to integrate with the backend, open an issue or contact the maintainer.

## Notes

This README is based on the current project source and package configuration. Update the live URL and feature list as the app evolves.

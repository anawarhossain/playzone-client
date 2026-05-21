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

Local development preview:

- http://localhost:3000

> If the app is deployed, replace the above local URL with the production site URL.

## Features

- Facility browsing and detail pages
- Search filters and pagination
- User authentication with registration and login
- Booking workflow for selected time slots
- Facility management dashboard for owners/admins
- Responsive UI for desktop and mobile
- Animated interactions using motion components
- Notifications and toast messages

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

## Notes

This README is based on the current project source and package configuration. Update the live URL and feature list as the app evolves.

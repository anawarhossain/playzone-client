"use server";

import { revalidatePath } from "next/cache";

// ── FACILITIES ──────────────────────────────────────────────────

export const getAllFacilities = async (searchParams) => {
  const searchQuery = searchParams?.search || "";
  const typeQuery = searchParams?.type || "";
  const page = searchParams?.page || 1;
  const ownerEmail = searchParams?.ownerEmail || "";

  const params = new URLSearchParams({
    search: searchQuery,
    type: typeQuery,
    page: String(page),
    ...(ownerEmail && { ownerEmail }),
  });

  const res = await fetch(`${process.env.BACKEND_URL}/facilities?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch facilities");
  return res.json();
};

export const getSingleFacility = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilities/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Facility not found");
  return res.json();
};

// ✅ নতুন facility যোগ করা
export const addFacility = async (facilityData) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facilityData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to add facility");
  }
  revalidatePath("/manage-facilities");
  return res.json();
};

// ✅ facility আপডেট করা
export const updateFacility = async (id, facilityData) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilities/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facilityData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update facility");
  }
  revalidatePath("/manage-facilities");
  return res.json();
};

// ✅ facility মুছে ফেলা
export const deleteFacility = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilities/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete facility");
  }
  revalidatePath("/manage-facilities");
  return res.json();
};

// ── BOOKINGS ────────────────────────────────────────────────────

export const getUserBookings = async (email, status = "All") => {
  if (!email) return [];
  const res = await fetch(
    `${process.env.BACKEND_URL}/booking?email=${encodeURIComponent(email)}&status=${encodeURIComponent(status)}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

export const cancelBooking = async (bookingId) => {
  const res = await fetch(`${process.env.BACKEND_URL}/booking/${bookingId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to cancel booking");
  }
  revalidatePath("/booking");
  return res.json();
};

const ALLOWED_TRANSITIONS = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Cancelled"],
  Cancelled: [],
};

export const updateBookingStatus = async (
  bookingId,
  currentStatus,
  newStatus,
) => {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] ?? [];
  if (!allowed.includes(newStatus))
    throw new Error(
      `Status change from "${currentStatus}" to "${newStatus}" is not allowed.`,
    );

  const res = await fetch(
    `${process.env.BACKEND_URL}/booking/${bookingId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update status");
  }
  revalidatePath("/booking");
  return res.json();
};

export const createBooking = async (bookingData, token) => {
  const res = await fetch(`${process.env.BACKEND_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
     },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create booking");
  }
  revalidatePath("/booking");
  return res.json();
};

"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const createFacilities = async (finalData) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL || "http://localhost:5000"}/facilitie`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      },
    );

    const data = await res.json();

    if (data.insertedId) {
      revalidatePath("/facilities-manage");
    } else {
      return { error: "Failed to create" };
    }
  } catch (error) {
    return { error: error.message };
  }

  redirect("/facilities-manage"); 
};


export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const deleteFacility = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilitie/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.deletedCount > 0) {
    revalidatePath("/dashboard/facilities");
  }
  return data;
};




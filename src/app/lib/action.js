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





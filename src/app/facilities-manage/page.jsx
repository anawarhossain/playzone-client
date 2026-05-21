// app/dashboard/manage-facilities/page.jsx
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAllFacilities,
  updateFacility,
  deleteFacility,
  addFacility,
} from "@/app/lib/data";
import ManageFacilitiesClient from "@/components/dashboard/ManageFacilitiesClient";
import { auth } from "../lib/auth";

export default async function ManageFacilitiesPage({ searchParams }) {
  const param = await searchParams;

  // ── Auth ────────────────────────────────────────────────────
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = session.user;

  // ── Fetch শুধু নিজের facilities ─────────────────────────────
  const data = await getAllFacilities({
    search: param.search || "",
    type: param.type || "",
    page: param.page || 1,
    ownerEmail: user.email, // ✅ server-side filter
  });

  const { facilities = [], totalPages = 1, currentPage = 1 } = data;

  // ── Server Actions ──────────────────────────────────────────
  async function handleAdd(facilityData) {
    "use server";
    // formData-র বদলে সরাসরি plain object রিসিভ করা হচ্ছে
    await addFacility({ ...facilityData, ownerEmail: user.email });
  }

  async function handleEdit(id, facilityData) {
    "use server";
    await updateFacility(id, facilityData);
  }

  async function handleDelete(id) {
    "use server";
    await deleteFacility(id);
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Manage Facilities
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, edit or remove your facilities
          </p>
        </header>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            label="Total"
            value={data.totalCount ?? facilities.length}
            color="blue"
          />
          <SummaryCard
            label="Cricket"
            value={facilities.filter((f) => f.type === "Cricket").length}
            color="green"
          />
          <SummaryCard
            label="Football"
            value={facilities.filter((f) => f.type === "Football").length}
            color="yellow"
          />
          <SummaryCard
            label="Others"
            value={
              facilities.filter(
                (f) => !["Cricket", "Football"].includes(f.type),
              ).length
            }
            color="gray"
          />
        </div>

        {/* Search + Filter bar */}
        <SearchFilterBar
          currentSearch={param.search}
          currentType={param.type}
        />

        {/* Client component handles Add / Edit / Delete UI */}
        <ManageFacilitiesClient
          facilities={facilities}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?page=${p}&search=${param.search || ""}&type=${param.type || ""}`}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black border transition-all ${
                  p === Number(currentPage)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────

function SummaryCard({ label, value, color }) {
  const colors = {
    blue: "border-blue-400  bg-blue-50  text-blue-600",
    green: "border-green-400 bg-green-50 text-green-600",
    yellow: "border-yellow-400 bg-yellow-50 text-yellow-600",
    gray: "border-gray-300  bg-gray-50   text-gray-500",
  };
  return (
    <div
      className={`rounded-2xl border-l-4 px-4 py-3 bg-white shadow-sm ${colors[color]}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
        {label}
      </p>
      <p className="text-2xl font-black mt-0.5">{value}</p>
    </div>
  );
}

function SearchFilterBar({ currentSearch, currentType }) {
  const SPORT_TYPES = [
    "All",
    "Cricket",
    "Football",
    "Basketball",
    "Swimming",
    "Tennis",
    "Badminton",
    "Volleyball",
    "Athletics",
    "Other",
  ];
  return (
    <form method="GET" className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        name="search"
        defaultValue={currentSearch}
        placeholder="Search by name..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <select
        name="type"
        defaultValue={currentType || "All"}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {SPORT_TYPES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

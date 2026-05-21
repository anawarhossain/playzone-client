export const getAllFacilities = async (searchParams) => {
  const searchQuery = searchParams?.search || "";
  const typeQuery = searchParams?.type || "";
  const page = searchParams?.page || 1;

  const res = await fetch(
    `${process.env.BACKEND_URL}/facilities?search=${searchQuery}&type=${typeQuery}&page=${page}`,
    { cache: "no-store" },
  );
  return res.json();
};

export const getSingleFacility = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/facilities/${id}`, {
    cache: "no-store",
  });
  return res.json();
};

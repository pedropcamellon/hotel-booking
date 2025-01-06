import Home from "@/components/Home";

export const metadata = {
  title: "La Fuente Motel",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  try {
    if (!process.env.API_URL) {
      console.error("API_URL is not defined");

      throw new Error("API_URL is not defined");
    }

    const url = `${process.env.API_URL}/api/rooms?${queryString}`;

    const res = await fetch(url, {
      cache: "no-cache",
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Error fetching data", error);

    return null;
  }
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  // TODO Show error message
  // if (data?.errMessage) {
  //   return <Error error={data} />;
  // }

  return <Home data={data} />;
}

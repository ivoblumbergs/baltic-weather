import { useState } from "react";
import { CityCard } from "~/components/city-card";
import type { Route } from "./+types/home";
import { CloudSun } from "lucide-react";
import { AddCityDialog } from "~/components/add-city";
import { Button } from "~/components/ui/button";
import { PrismaClient } from "@prisma/client";
import { getCityWeather } from "~/lib/weather.server";

const prisma = new PrismaClient();

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Baltic Data Weather" },
    { name: "description", content: "Weather App" },
  ];
}

// Handles Adding/Deleting
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent"); // "add" or "delete"

  if (intent === "delete") {
    const cityId = Number(formData.get("cityId"));
    await prisma.city.delete({ where: { id: cityId } });
    return { success: true };
  }

  // Default: Add City
  const cityName = formData.get("cityName") as string;
  if (!cityName) return { error: "Name required" };

  try {
    await prisma.city.create({ data: { name: cityName } });
    return { success: true };
  } catch (e) {
    return { error: "City already exists" };
  }
}

// Fetches DB Cities
export async function loader({ request }: Route.LoaderArgs) {
  // 1. Get list of cities from DB
  const cities = await prisma.city.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fetch weather for ALL cities in PARALLEL which is way faster then calling everything seperately
  const citiesWithWeather = await Promise.all(
    cities.map(async (city) => {
      const weather = await getCityWeather(city.name);
      return { ...city, weather };
    }),
  );

  return { cities: citiesWithWeather };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { cities } = loaderData;
  const [unit, setUnit] = useState<"C" | "F">("C"); // State for Unit Toggle

  const toggleUnit = () => setUnit((prev) => (prev === "C" ? "F" : "C"));

  return (
    <div className="min-h-screen bg-gray-50 text-brand-dark">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left Side: Logo */}
          <div className="flex items-center gap-6">
            <img
              src="/logo.png"
              alt="Baltic Data"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <div className="hidden md:block h-8 w-px bg-gray-200"></div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-brand-navy leading-tight">
                Weather App
              </h1>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={toggleUnit}
              className="w-16 font-mono font-bold text-brand-navy border-gray-300"
            >
              °{unit}
            </Button>
            <AddCityDialog />
          </div>
        </div>
      </header>

      {/* Main Content Container (Centered) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pilsētu Pārskats</h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
              <CloudSun className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Nav Datu</h3>
              <p className="text-gray-500 mb-6">
                Saraksts ir tukšs. Pievienojiet pilsētu.
              </p>
            </div>
          ) : (
            cities.map((city) => (
              // Pass the unit state to the card
              <CityCard key={city.id} city={city} unit={unit} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

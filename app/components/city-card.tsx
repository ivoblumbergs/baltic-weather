import { Form } from "react-router";
import { Trash2, Wind, Droplets, MapPin } from "lucide-react";

// Define Props for (Type Safety)
interface CityCardProps {
  city: {
    id: number;
    name: string;
    weather?: {
      temp: number;
      condition: string;
      humidity: number;
      windSpeed: number;
      icon: string;
    } | null;
  };
  unit: "C" | "F";
}

export function CityCard({ city, unit }: CityCardProps) {
  // Logic: API returns Metric (C) by default, Convert if unit is F
  const displayTemp =
    unit === "C"
      ? city.weather?.temp
      : Math.round(((city.weather?.temp || 0) * 9) / 5 + 32);

  // m/s to mph conversion
  const displaySpeed =
    unit === "C"
      ? `${city.weather?.windSpeed} m/s`
      : `${Math.round((city.weather?.windSpeed || 0) * 2.237)} mph`;

  return (
    <div className="relative group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      {/* Delete Button (Hidden until hover) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="cityId" value={city.id} />
          <button
            type="submit"
            className="text-gray-400 hover:text-red-500 cursor-pointer"
            title="Dzēst"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Form>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-orange" />
          <h3 className="text-lg font-bold text-brand-navy uppercase tracking-wide">
            {city.name}
          </h3>
        </div>
        {city.weather?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
            alt="icon"
            className="h-10 w-10"
          />
        )}
      </div>

      {city.weather ? (
        <div className="space-y-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-brand-orange">
              {displayTemp}°{unit}
            </span>
            <span className="ml-2 text-gray-500 font-medium">
              {city.weather.condition}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <Droplets className="h-4 w-4 text-blue-400" />
              <span>{city.weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <Wind className="h-4 w-4 text-gray-400" />
              <span>{displaySpeed}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-400 text-sm py-4">
          Dati nav pieejami (Check API Key)
        </div>
      )}
    </div>
  );
}

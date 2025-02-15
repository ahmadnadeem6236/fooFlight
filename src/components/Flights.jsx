/* eslint-disable react/prop-types */
import { Card, Chip } from "@mui/material";
import { Warning } from "@mui/icons-material";

const FlightCard = ({ flight }) => {
  return (
    <Card className="flex items-center justify-between p-4 mb-2 border border-gray-300 rounded-lg">
      {/* Airline Logo and Details */}
      <div className="flex items-center space-x-4">
        <img
          src={flight.airlineLogo}
          alt={flight.airline}
          className="w-10 h-10"
        />
        <div>
          <p className="font-semibold">
            {flight.departureTime} - {flight.arrivalTime}
          </p>
          <p className="text-gray-600">{flight.airline}</p>
        </div>
      </div>

      {/* Duration & Stops */}
      <div className="text-center">
        <p className="font-medium">{flight.duration}</p>
        <p className="text-gray-500">
          {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
        </p>
        {flight.stops > 0 && (
          <Chip
            icon={<Warning className="text-red-500" />}
            label={`${flight.layover} layover`}
            size="small"
            className="mt-1 bg-red-100 text-red-700"
          />
        )}
      </div>

      {/* CO₂ Emissions */}
      <div className="text-center">
        <p className="text-gray-700">{flight.co2Emissions} kg CO₂e</p>
        <Chip
          label={`${flight.co2Reduction}% emissions`}
          size="small"
          className={`mt-1 ${
            flight.co2Reduction < 0
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        />
        {flight.treesSaved && (
          <Chip
            label={`Avoids ${flight.treesSaved} trees' CO₂`}
            size="small"
            className="mt-1 bg-green-200 text-green-800"
          />
        )}
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-green-600 font-semibold text-lg">₹{flight.price}</p>
        <p className="text-gray-500 text-sm">round trip</p>
      </div>
    </Card>
  );
};

// Example usage
const FlightList = () => {
  const flights = [
    {
      airline: "Air India",
      airlineLogo:
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Air_India_2023.svg",
      departureTime: "6:05 AM",
      arrivalTime: "8:35 AM",
      duration: "4 hr",
      stops: 0,
      layover: "",
      co2Emissions: 159,
      co2Reduction: -20,
      treesSaved: 2435,
      price: "28,173",
    },
    {
      airline: "IndiGo",
      airlineLogo:
        "https://upload.wikimedia.org/wikipedia/commons/6/69/IndiGo_Airlines_logo.svg",
      departureTime: "5:10 PM",
      arrivalTime: "7:50 PM",
      duration: "4 hr 10 min",
      stops: 0,
      layover: "",
      co2Emissions: 162,
      co2Reduction: -19,
      treesSaved: null,
      price: "28,420",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-3">
      {flights?.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;

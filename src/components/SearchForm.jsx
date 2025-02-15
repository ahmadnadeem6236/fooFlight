import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useFlightStore from "../store";
import useDebounce from "../hooks/useDebounce"; // Import custom debounce hook
import { useEffect } from "react";
import TripType from "./TripType";
import PassengerSelector from "./PassengerSelector";
import ClassType from "./ClassType";

function SearchForm() {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    travellers,
    airports,
    loading,
    setOrigin,
    classType,
    setDestination,
    setDepartureDate,
    setReturnDate,
    tripType,
    fetchAirports,
    fetchFlights,
  } = useFlightStore();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 1000); // Debounce input

  useEffect(() => {
    if (debouncedQuery) fetchAirports(debouncedQuery);
  }, [debouncedQuery, fetchAirports]);

  const handleSearch = () => {
    console.log("Searching flights:", {
      origin,
      destination,
      departureDate,
      returnDate,
      travellers,
      tripType,
      classType,
    });
    if (origin && destination && departureDate) {
      fetchFlights({
        originSkydId: origin.skyId,
        destinationSkyId: destination.skyId,
        originEntityId: origin.originEntityId,
        destinationEntityId: destination.entityId,
        date: departureDate,
        returnDate: returnDate,
        cabinClass: classType,
      });
    }
  };

  const fromAirports = [];
  const toAirports = [];
  const listAirports = airports;
  listAirports.map((item) => fromAirports.push(item.data[0]));
  listAirports.map((item) => toAirports.push(item.data[0]));

  console.log(listAirports);

  return (
    <div className=" p-6 flex flex-col gap-2">
      <div className="flex items-center justify-center md:justify-start gap-2">
        <div>
          <TripType />
        </div>
        <div>
          <PassengerSelector />
        </div>
        <div>
          <ClassType />
        </div>
      </div>
      <div className="flex flex-col md:grid  md:grid-cols-2 gap-4 ">
        <div>
          {/* FROM (Origin) */}
          <Autocomplete
            options={fromAirports}
            getOptionLabel={(option) =>
              `${option.presentation?.suggestionTitle}`
            }
            value={origin}
            onChange={(event, newValue) => setOrigin(newValue)}
            onInputChange={(event, newValue) => {
              setSearchQuery(newValue);
              fetchAirports(newValue); // Fetch airports dynamically
            }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From where?"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        </div>
        <div>
          {/* TO (Destination) */}
          <Autocomplete
            options={toAirports}
            getOptionLabel={(option) => {
              if (option) {
                return `${option.presentation?.suggestionTitle}`;
              }
            }}
            value={destination}
            onChange={(event, newValue) => setDestination(newValue)}
            onInputChange={(event, newValue) => fetchAirports(newValue)}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To where?"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        </div>

        <div>
          {/* DEPARTURE DATE */}
          <TextField
            type="date"
            className="w-full"
            label="Departure Date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        {tripType === "round-trip" ? (
          <div>
            {/* RETURN DATE */}
            <TextField
              type="date"
              className="w-full"
              label="Return Date (Optional)"
              slotProps={{ inputLabel: { shrink: true } }}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className=" col-span-4 flex justify-center">
          {/* SEARCH BUTTON */}
          <Button variant="contained" onClick={handleSearch}>
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

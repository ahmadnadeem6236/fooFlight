import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useFlightStore from "../store";
import useDebounce from "../hooks/useDebounce"; // Import custom debounce hook
import { useEffect } from "react";

function SearchForm() {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    passengers,
    airports,
    loading,
    setOrigin,
    setDestination,
    setDepartureDate,
    setReturnDate,
    fetchAirports,
  } = useFlightStore();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500); // Debounce input

  useEffect(() => {
    if (debouncedQuery) fetchAirports(debouncedQuery);
  }, [debouncedQuery, fetchAirports]);

  const handleSearch = () => {
    console.log("Searching flights:", {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
    });
  };

  const fromAirports = [];
  const toAirports = [];
  const listAirports = airports;
  listAirports.map((item) => fromAirports.push(item.data[0]));
  listAirports.map((item) => toAirports.push(item.data[0]));

  console.log("origin", origin);
  console.log("des", destination);
  console.log("date", returnDate);

  return (
    <div className=" p-6 flex flex-col gap-2">
      <div className="bg-amber-400">p</div>
      <div className="flex flex-col md:grid  md:grid-cols-2 gap-4 ">
        <div>
          {/* FROM (Origin) */}
          <Autocomplete
            options={fromAirports}
            getOptionLabel={(option) =>
              `${option.presentation.suggestionTitle}`
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

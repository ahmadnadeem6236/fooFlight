import { useEffect, useRef } from "react";
import FlightList from "./components/Flights";
import SearchForm from "./components/SearchForm";
import useFlightStore from "./store";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const { loading } = useFlightStore();
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!loading && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div className="h-full w-full">
      <img
        className="mx-auto w-full h-[150px] object-cover"
        src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
        alt="flight"
      />
      <main className="container mx-auto px-4">
        <div className="shadow-lg border-[1px] border-gray-100 rounded-lg mt-2 ">
          <SearchForm />
        </div>
        <div className="pt-13 flex justify-center" ref={resultsRef}>
          {loading ? <CircularProgress /> : <FlightList />}
        </div>
      </main>
    </div>
  );
}

export default App;

import SearchForm from "./components/SearchForm";

function App() {
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
      </main>
    </div>
  );
}

export default App;

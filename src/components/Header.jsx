import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function Headers() {
  return (
    <header className="shadow w-full border-b-[1px] border-gray-100 sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-5 flex items-center justify-center gap-2">
        <FlightTakeoffIcon
          style={{ fontSize: "30px" }}
          className=" text-blue-500 flex items-center justify-center"
        />
        <span className="md:text-2xl font-semibold tracking-wide">
          Flight Search
        </span>
      </div>
    </header>
  );
}

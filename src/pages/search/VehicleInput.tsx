export default function VehicleInput() {
  return (
    <div className="my-shadow w-full rounded-3xl bg-white p-4">
      <div className="relative grid w-full grid-cols-[40px_1fr] grid-rows-[40px] items-stretch justify-center gap-1">
        <label htmlFor="end_location" className="flex items-center justify-center">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="train_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <input
          type="text"
          id="end_location"
          placeholder="Destination location"
          className="rounded p-4"
        />
      </div>
    </div>
  );
}

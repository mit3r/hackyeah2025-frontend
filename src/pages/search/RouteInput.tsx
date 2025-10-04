export default function RouteInput() {
  return (
    <div className="my-shadow w-full rounded-3xl bg-white p-4">
      <div className="relative grid w-full grid-cols-[40px_1fr] grid-rows-[40px_1px_40px] items-stretch justify-center gap-1">
        <label htmlFor="start_location">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="near_me_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <input type="text" id="start_location" placeholder="Your location" className="p-4" />
        <div className="col-start-2 flex items-center justify-center bg-gray-300" />
        <label htmlFor="end_location" className="flex items-center justify-center">
          <img
            width={40}
            height={40}
            className="p-1 invert"
            src="location_on_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
        </label>
        <input
          type="text"
          id="end_location"
          placeholder="Destination location"
          className="rounded p-4"
        />
        <div className="absolute top-[35px] left-[20px]">
          <svg width={30} height={30} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 v24" fill="none" stroke="black" strokeWidth={4} strokeDasharray={'3'} />
          </svg>
        </div>
      </div>
    </div>
  );
}

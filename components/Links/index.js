//Links API: Array of url, anchor spreadable Props. Will render in styled flexbox wrappable div. Keeps hover state.

export default function Links({ items }) {
  return (
    <div className="flex gap-x-5 font-bold text-cWhite font-pilot">
      {items.map(({ label, url }) => {
        return (
          <button
            className="border-cMineShaft border-2 bg-cSilver/25 rounded-md 
            shadow-md px-2 py-1 flex justify-center items-center 
            hover:text-red-200 hover:bg-red-200/25 transition ease-in 400ms"
            type="button"
            onClick={() =>
              console.log(
                "Should redirect/Scroll to anchor threeFiber scene on category:",
                label
              )
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

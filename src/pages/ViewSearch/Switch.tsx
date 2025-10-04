export default function Switch(props: { onClick: () => void; options: [string, string] }) {
  return (
    <button className="relative top-0 left-0 grid w-full grid-cols-2 grid-rows-1 gap-4 rounded-full bg-gray-300 px-8 py-5">
      {props.options.map((option) => (
        <span className="z-1005 w-full" key={option} onClick={props.onClick}>
          {option}
        </span>
      ))}

      <span className="absolute h-full w-1/2 bg-white" onClick={props.onClick}></span>
    </button>
  );
}

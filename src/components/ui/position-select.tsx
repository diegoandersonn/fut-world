type Props = {
  placeholder: string;
  field?: {
    value: string;
    onChange: (value: string) => void;
  };
};

export default function PositionSelect({ placeholder, field }: Props) {
  const options = [
    { value: "Goalkeeper", label: "Goalkeeper" },
    { value: "Center Back", label: "Center Back" },
    { value: "Full Back", label: "Full Back" },
    { value: "Defensive Midfielder", label: "Defensive Midfielder" },
    { value: "Center Midfielder", label: "Center Midfielder" },
    { value: "Attacking Midfielder", label: "Attacking Midfielder" },
    { value: "Winger", label: "Winger" },
    { value: "Striker", label: "Striker" },
  ];

  return (
    <select
      className="px-3 py-1 h-8 text-white bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none"
      value={field?.value}
      onChange={(e) => field?.onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

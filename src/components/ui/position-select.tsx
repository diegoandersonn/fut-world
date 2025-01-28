type Props = {
  placeholder: string;
  field?: {
    value: string;
    onChange: (value: string) => void;
  };
};

export default function PositionSelect({ placeholder, field }: Props) {
  const options = [
    { value: "goalkepper", label: "Goalkepper" },
    { value: "centerback", label: "Center Back" },
    { value: "fullback", label: "Full Back" },
    { value: "defensivemidfielder", label: "Defensive Midfielder" },
    { value: "centermidfielder", label: "Center Midfielder" },
    { value: "attackingmidfielder", label: "Attacking Midfielder" },
    { value: "winger", label: "Winger" },
    { value: "striker", label: "Striker" },
  ];

  return (
<select
        className="w-full h-8 px-3 py-1 bg-transparent border border-zinc-400 text-white rounded-md hover:scale-105 focus:outline-none focus:ring focus:ring-emerald-500"
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

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
    { value: "Centre-Back", label: "Centre-Back" },
    { value: "Left-Back", label: "Left-Back" },
    { value: "Right-Back", label: "Right-Back" },
    { value: "Defensive Midfield", label: "Defensive Midfield" },
    { value: "Central Midfield", label: "Central Midfield" },
    { value: "Attacking Midfield", label: "Attacking Midfield" },
    { value: "Left Winger", label: "Left Winger" },
    { value: "Right Winger", label: "Right Winger" },
    { value: "Centre-Forward", label: "Centre-Forward" },
  ];

  return (
    <select
      className="px-3 py-1 h-8 text-white bg-neutral-950 border border-zinc-400 rounded-md hover:scale-110 focus:outline-none"
      value={field?.value}
      onChange={(e) => field?.onChange(e.target.value)}
    >
      <option value="">
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

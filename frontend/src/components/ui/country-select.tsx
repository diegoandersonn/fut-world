import { SingleValue } from "react-select";
import Select from "react-select";
import { useGetCountries } from "../../hooks/use-getCountries";

type Props = {
  placeholder?: string;
  field?: any;
};

export default function CountrySelect({ placeholder, field }: Props) {
  const countries = useGetCountries();
  const options = countries?.map((country) => ({
    value: country,
    label: country.name,
  }));

  return (
    <Select
      {...field}
      className="h-8 rounded-md hover:scale-110 focus:outline-none"
      options={options}
      placeholder={placeholder}
      onChange={(selected: SingleValue<{ value: string; label: string }>) =>
        field.onChange(selected?.value || "")
      }
      value={options?.find((option) => option.value === field.value)}
      maxMenuHeight={100}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
          border: "1px solid #a1a1aa",
          color: "white",
          input: {
            color: "white",
          },
        }),
        input: (base) => ({
          ...base,
          color: "white",
        }),
        option: (base, state) => ({
          ...base,
          color: "white",
          background: state.isFocused ? "gray" : "#0a0a0a",
        }),
        placeholder: (base) => ({
          ...base,
          color: "white",
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
        }),
      }}
    />
  );
}

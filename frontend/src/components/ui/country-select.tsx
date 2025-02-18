import { SingleValue } from "react-select";
import Select from "react-select";
import { CountryType } from "../../types/countryType";
import { useQuery } from "@tanstack/react-query";

type Props = {
  placeholder?: string;
  field?: any;
};

export default function CountrySelect({ placeholder, field }: Props) {
  const { data: countriesResponse } = useQuery<CountryType[]>({
    queryKey: ["get-countries"],
    queryFn: async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const array: CountryType[] = [];
      data.forEach((country) => {
        array.push({ name: country.name.common, flag: country.flags.png });
      });
      return array;
    },
  });

  const options = countriesResponse?.map((country) => ({
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

import { useState, useEffect } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";
import axios from "axios";

type Props = {
  placeholder: string;
  field?: any;
};

export default function CountrySelect({ placeholder, field }: Props) {
  const [countries, setCountries] = useState<string[]>([]);

  const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
  });

  useEffect(() => {
    api
      .get("/all")
      .then((response) => {
        const array: string[] = [];
        response.data.forEach((country) => {
          array.push(country.name.common);
        });
        setCountries(array);
      })
      .catch((e) => console.log(e));
  }, [api]);

  const options = countries.map((country) => ({
    value: country,
    label: country,
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
      value={options.find((option) => option.value === field.value)}
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
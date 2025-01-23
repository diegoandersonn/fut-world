import axios from "axios";
import { useState, useEffect } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";

type Props = {
  placeholder: string;
  field: any;
}

export default function TeamFormSelect({ placeholder, field }: Props) {
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
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#0a0a0a",
          border: "1px solid #a1a1aa",
          color: "white",
          input: {
            color: "white",
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#0a0a0a",
          color: "white",
        }),
        option: (base) => ({
          color: "white",
          ...base,
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


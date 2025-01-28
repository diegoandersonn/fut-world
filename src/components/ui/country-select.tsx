import axios from "axios";
import { useState, useEffect } from "react";

type Props = {
    placeholder: string;
    field?: {
      value: string;
      onChange: (value: string) => void;
    };
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
  
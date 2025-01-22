import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
};

export default function TeamFormSelect({ placeholder, ...rest }: Props) {
  const [countries, setCountries] = useState([]);
  const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
  });
  useEffect(() => {
    api
      .get("/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((e) => console.log(e));
  }, [api]);
  return (
    <div className="text-white">
      <select
        {...rest}
        className="p-4 h-8 text-white bg-neutral-950 rounded-md hover:scale-110 focus:outline-none"
      >
        <option value="" disabled className="text-white">
          {placeholder}
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
}

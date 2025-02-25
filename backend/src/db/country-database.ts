import { CountryType } from "../../../shared/types/countryType";

export class CountryDatabase {
  #countries: Map<string, CountryType> = new Map();

  create(country: CountryType) {
    this.#countries.set(country.id, country);
  }

  update(countryId: string, country: CountryType) {
    this.#countries.set(countryId, country);
  }

  delete(countryId: string) {
    this.#countries.delete(countryId);
  }

  list(filter?: string) {
    return Array.from(this.#countries.entries())
      .map((countryArray) => {
        const data = countryArray[1];
        return { ...data };
      })
      .filter((country) => {
        if (filter) {
          return country.name === filter;
        }
        return true;
      });
  }
}

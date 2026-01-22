import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        return {
            capital: restCountry.capital.join(', '),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No hay nombre en español',
            population: restCountry.population
        }
    }

    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }
}
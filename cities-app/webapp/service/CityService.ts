import { AppSettings } from "../util/AppSettings";
import CityDataParams from "../helper/CityDataParams";
import City from "../helper/City";
import encodeURLParameters from "sap/base/security/encodeURLParameters";

export default class CityService {
    private static instance: CityService;
    private serviceUrl: string;

    public static getInstance(serviceUrl: string): CityService {
        this.instance ??= new CityService(serviceUrl);
        return this.instance;
    }

    private constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
    }

    /**
     * Fetches a list of cities with optional filtering and sorting parameters.
     * @param params - An object of type CityDataParams containing optional filtering and sorting parameters.
     * @returns A Promise resolving to an array of City objects.
     */
    public getCities(params: CityDataParams = {}): Promise<City[]> {
        const uri = this.generateUri(params);
        return fetch(uri)
            .then(res => res.json())
            .catch((err: Error) => {
                console.error("Error fetching cities:", err.message);
                throw err; // Re-throw the error for further handling
            });
    }

    public async createCity(city:City){
        return fetch(this.serviceUrl, {
            method: 'POST',
            body: JSON.stringify(city),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    /**
     * Generates the URI for the API call with query parameters for filtering and sorting.
     * @param params - An object of type CityDataUpdateParams.
     * @returns The generated URI.
     */
    private generateUri(params: CityDataParams): string {
        const htmlEscapedFilterValue = this.processFilterChunk(params.filterValue);
        const htmlEscapedFilterProperty = this.processFilterChunk(params.filterProperty);
        const htmlEscapedFilterOperator = this.processFilterChunk(params.filterOperator);

        const filterQuery = htmlEscapedFilterProperty && htmlEscapedFilterOperator && htmlEscapedFilterValue
            ? `filter=${htmlEscapedFilterProperty}${htmlEscapedFilterOperator}${htmlEscapedFilterValue}`
            : '';
        const sortQuery = params.sortBy
            ? `sortBy=${params.sortBy}&order=${params.order || 'asc'}`
            : '';
        
        const queryParts = [filterQuery, sortQuery].filter(part => part.length > 0);
        const query = queryParts.join('&');
        return `${this.serviceUrl}?${query}`;
    }

        /**
     * Processes and encodes a filter chunk for use in query parameters.
     * Trims the input string, replaces all spaces with the pipe ('|') character, 
     * and then applies URI component encoding.
     *
     * @param {string} [valueToEscape] - The string value to be processed and encoded. Optional.
     * @returns {string} The processed and encoded string. Returns an empty string if the input is falsy.
     * @private
     */
    private processFilterChunk(valueToEscape?: string): string {
        if (!valueToEscape) {
            return '';
        }
        valueToEscape = valueToEscape.trim();
        valueToEscape = valueToEscape.replaceAll(' ', '|');
        return encodeURIComponent(valueToEscape);
    }

}

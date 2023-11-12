import { AppSettings } from "../util/AppSettings";
import CityDataParams from "../helper/CityDataParams";
import City from "../helper/City";

export default class CityService {
    private static instance: CityService;

    public static getInstance(): CityService {
        this.instance ??= new CityService();
        return this.instance;
    }

    private constructor() {}

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
        return fetch(AppSettings.BASE_API_PATH, {
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
        const filterQuery = params.filterProperty && params.filterOperator && params.filterValue
            ? `filter=${params.filterProperty}${params.filterOperator}${params.filterValue}`
            : '';
        const sortQuery = params.sortBy
            ? `sortBy=${params.sortBy}&order=${params.order || 'asc'}`
            : '';
        
        const queryParts = [filterQuery, sortQuery].filter(part => part.length > 0);
        const query = queryParts.join('&');
        return `${AppSettings.BASE_API_PATH}?${query}`;
    }
}

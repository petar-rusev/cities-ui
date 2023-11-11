/**
 * Interface representing the structure of a city.
 */
export default interface City {
    /**
     * The name of the city.
     */
    name: string;

    /**
     * The total population of the city.
     */
    population: number;

    /**
     * The total area of the city in square kilometers.
     */
    area: number;

    /**
     * The population density of the city per square kilometer.
     */
    density: number;
}

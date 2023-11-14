import { ComparisonOperator } from "../enums/ComparisonOperator";

/**
 * Interface defining the parameters for fetching city data.
 */
export default interface CityDataParams {
    /**
     * Property name on which to apply the filter.
     */
    filterProperty?: string;

    /**
     * Operator used for filtering. Examples: '=', '<', '>', etc.
     */
    filterOperator?: string;

    /**
     * Value to be used in conjunction with filterProperty and filterOperator for filtering.
     */
    filterValue?: string;

    /**
     * Property name by which to sort the data.
     */
    sortBy?: string;

    /**
     * Order of sorting, e.g., 'asc' for ascending, 'desc' for descending.
     */
    order?: string;
}

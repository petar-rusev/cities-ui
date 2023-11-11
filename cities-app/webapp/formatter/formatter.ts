export default {
    /**
     * Determines the highlight style for a row based on the population.
     * Rows representing cities with a population greater than 1 million are highlighted with 'Success'.
     * Otherwise, no special highlight is applied ('None').
     * 
     * @param {number} population - The population of the city.
     * @returns {string} The highlight style, either 'Success' or 'None'.
     */
    formatRowHighlight : function(population: number): string {
        if (population > 1000000) {
            return 'Success';
        } else {
            return 'None';
        }
    }
}

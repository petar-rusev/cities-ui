import Controller from "sap/ui/core/mvc/Controller";
import CityDataParams from "../helper/CityDataParams";
import CityService from "../service/CityService";
import Select from "sap/m/Select";
import SegmentedButton from "sap/m/SegmentedButton";
import Input from "sap/m/Input";

export default abstract class BaseController extends Controller {

    protected _currentSearch: CityDataParams = {};
    protected _currentSort: CityDataParams = {};
    protected _citiesService: CityService;
    protected _filterPropertySelect: Select;
    protected _filterOperatorButton: SegmentedButton;
    protected _filterValueInput: Input;

    /**
     * Updates the search filter property in the model based on the current search criteria.
     * @param {string} filterProperty - The property being filtered on.
     * @param {string} filterOperator - The operator used in the filter.
     * @param {string | number} filterValue - The value of the filter.
     */
    protected updateSearchFilterProperty(filterProperty?: string, filterOperator?: string, filterValue?: string | number): void {
        let filterText = "No Filter Applied";

        if (filterProperty && filterOperator && filterValue !== undefined && filterValue !== null) {
            filterText = `Filter Applied: Property: '${filterProperty}', Operator: ${filterOperator}, Value: ${filterValue}`;
        }

        this.getModel("cities").setProperty("/filter", filterText);
    }


    /**
     * Fetches city data from the CityService and sets it to the model.
     * Handles any errors that occur during fetching and displays a message toast.
     */
    protected fetchCities(): void {
        this._citiesService.getCities()
            .then(cities => this.getModel('cities').setProperty("/data", cities))
            .catch(() => MessageToast.show("Error initializing city data."));
    }

    /**
     * Extracts city data from input fields in the dialog.
     * @returns An object representing a city.
     */
    protected getCityFromInputFields(): City {
        const nameInput = this.byId('nameInput') as Input;
        const areaInput = this.byId('areaInput') as Input;
        const populationInput = this.byId('populationInput') as Input;

        return {
            name: nameInput.getValue(),
            area: parseFloat(areaInput.getValue()),
            population: parseInt(populationInput.getValue())
        };
    }

    /**
     * Retrieves a Dialog control by its ID.
     * @param dialogId - The ID of the dialog.
     * @returns The Dialog control.
     */
    protected getDialogById(dialogId: string): Dialog {
        return this.byId(dialogId) as Dialog;
    }

    /**
     * Gets a JSONModel by its name.
     * @param sName - The name of the model (optional).
     * @returns The requested JSONModel instance.
     */
    protected getModel(sName?: string): JSONModel {
        return this.getView()?.getModel(sName) as JSONModel;
    }

    /**
     * Updates city data based on the current search and sort criteria.
     * Fetches filtered and sorted city data from the CityService and updates the model.
     */
    protected updateCitiesData(): void {
        const params = { ...this._currentSearch, ...this._currentSort };
        this._citiesService.getCities(params)
            .then(cities => this.getModel('cities').setProperty('/data', cities))
            .catch(() => MessageToast.show("Error updating city data."));
    }

    protected updateCurrentSearch(newParams: Partial<CityDataParams>): void {
        this._currentSearch = { ...this._currentSearch, ...newParams };
    }


        /**
     * Sets up filter options based on the selected property.
     * 
     * @param {string} [propertySelected] - The property selected for filtering. If not provided, 
     *                                      the default filter property is used.
     */
    protected setupFilterOptions(propertySelected: string){
        // Default to the current filter property if no property is explicitly selected
        if(!propertySelected){
            this.updateCurrentSearch({ filterProperty: this._filterPropertySelect.getSelectedKey() });
        }

        // Toggle filter options based on the property selected
        const isStringFilter = propertySelected === 'name';
        this.toggleFilterOperations(isStringFilter);
        this.toggleFilterValueType(isStringFilter);
    }

        /**
     * Toggles the filter operations based on the filter type.
     * 
     * @param {boolean} isStringFilter - Indicates if the current filter is for string values.
     */
    protected toggleFilterOperations(isStringFilter: boolean) {
        this._filterOperatorButton.getItems().forEach(segment => {
            const segmentKey = segment.getKey();

            if (isStringFilter) {
                // For string filters, enable only operations, including '-' and ':'
                segment.setEnabled(segmentKey === '-' || segmentKey === ':');
            } else {
                // For numeric filters, enable all except '-' (numeric operations)
                segment.setEnabled(segmentKey !== '-');
            }
        });
    }

    /**
     * Toggles the filter value type based on the property type.
     * Sets the input type and placeholder appropriately.
     * 
     * @param {boolean} isStringFilter - Indicates if the current filter is for string values.
     */
    protected toggleFilterValueType(isStringFilter: boolean){
        const type = isStringFilter ? 'Text' : 'Number';
        const placeholder = `Enter ${isStringFilter ? 'Text' : 'Number'}`;
        this._filterValueInput.setType(type);
        this._filterValueInput.setPlaceholder(placeholder);
    }
}
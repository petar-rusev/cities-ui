import Controller from "sap/ui/core/mvc/Controller";
import Event from "sap/ui/base/Event";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";

import CityService from "../service/CityService";
import CityDataParams from "../helper/CityDataParams";
import formatter from "../formatter/formatter";

export default class Cities extends Controller {
    public formatter = formatter;
    
    private _currentSearch: CityDataParams = {};
    private _currentSort: CityDataParams = {};

    /**
     * Called when the controller is instantiated. Initializes the controller and fetches initial city data.
     */
    public onInit(): void {
        this.fetchCities();
    }

    /**
     * Fetches city data from the CityService and sets it to the model.
     * Handles any errors that occur during fetching and displays a message toast.
     */
    private fetchCities(): void {
        CityService.getInstance().getCities()
            .then(cities => this.getView().getModel("cities").setProperty("/data", cities))
            .catch(() => MessageToast.show("Error initializing city data."));
    }

    /**
     * Gets a JSONModel by its name.
     * @param sName - The name of the model (optional).
     * @returns The requested JSONModel instance.
     */
    private getModel(sName?: string): JSONModel {
        return this.getView().getModel(sName) as JSONModel;
    }

    /**
     * Updates city data based on the current search and sort criteria.
     * Fetches filtered and sorted city data from the CityService and updates the model.
     */
    private updateCitiesData(): void {
        const params = { ...this._currentSearch, ...this._currentSort };
        CityService.getInstance().getCities(params)
            .then(cities => this.getModel('cities').setProperty('/data', cities))
            .catch(() => MessageToast.show("Error updating city data."));
    }

    /**
     * Retrieves a Dialog control by its ID.
     * @param dialogId - The ID of the dialog.
     * @returns The Dialog control.
     */
    private getDialogById(dialogId: string): Dialog {
        return this.byId(dialogId) as Dialog;
    }

    /**
     * Opens the 'Create City' dialog.
     */
    public handleOpenCreateCityDialog(): void {
        this.getDialogById('createCityDialog').open();
    }

    /**
     * Closes the 'Create City' dialog.
     */
    public handleCloseCreateCityDialog(): void {
        this.getDialogById('createCityDialog').close();
    }

    /**
     * Handles the submission of a new city.
     * Extracts city data from input fields, calls the CityService to create a new city,
     * shows a success or error message, and closes the 'Create City' dialog.
     */
    public handleSubmitCityButtonPressed(): void {
        const city = this.getCityFromInputFields();
        CityService.getInstance().createCity(city)
            .then(() => MessageToast.show('City Created Successfully.'))
            .catch(() => MessageToast.show('Error creating city.'));
        this.handleCloseCreateCityDialog();
    }

    /**
     * Extracts city data from input fields in the dialog.
     * @returns An object representing a city.
     */
    private getCityFromInputFields(): City {
        const nameInput = this.byId('nameInput') as Input;
        const areaInput = this.byId('areaInput') as Input;
        const populationInput = this.byId('populationInput') as Input;

        return {
            name: nameInput.getValue(),
            area: areaInput.getValue(),
            population: populationInput.getValue()
        };
    }

    /**
     * Opens the 'Sort Cities' dialog.
     */
    public handleSortButtonPressed(): void {
        this.getDialogById('sortDialog').open();
    }

    /**
     * Handles the confirmation of the sort dialog.
     * Extracts sorting parameters and updates the city data accordingly.
     * @param oEvent - The event object containing sort dialog confirmation details.
     */
    public handleSortDialogConfirm(oEvent: Event): void {
        const mParams = oEvent.getParameters();
        this._currentSort = {
            sortBy: mParams.sortItem.getKey(),
            order: mParams.sortDescending ? 'DESC' : 'ASC'
        };
        this.getModel("cities").setProperty("/sorter", `Sorted by '${this._currentSort.sortBy}' ${this._currentSort.order}`);
        this.updateCitiesData();
    }

    /**
     * Handles search operations for cities.
     * Updates the search criteria and fetches the filtered city data.
     * @param oEvent - The event object containing the search query.
     */
    public handleSearch(oEvent: Event): void {
        const nameChunk = oEvent.getParameters().query;
        this._currentSearch = nameChunk ? 
            { filterProperty: "name", filterOperator: "Contains", filterValue: nameChunk } :
            {};

        this.updateCitiesData();
        this.updateSearchFilterProperty(nameChunk);
    }

    /**
     * Updates the search filter property in the model based on the current search query.
     * @param nameChunk - The current search query string.
     */
    private updateSearchFilterProperty(nameChunk: string | undefined): void {
        const filterText = nameChunk ? 
            `Filter Applied: Property: 'name', Operator: contains, Value: ${nameChunk}` : 
            "No Filter Applied";

        this.getModel("cities").setProperty("/filter", filterText);
    }
}

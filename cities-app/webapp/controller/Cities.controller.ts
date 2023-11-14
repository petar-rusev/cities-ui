import Event from "sap/ui/base/Event";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";

import CityService from "../service/CityService";
import CityDataParams from "../helper/CityDataParams";
import formatter from "../formatter/formatter";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { SortOrder } from "../enums/SortOrder";
import City from "../helper/City";
import SearchField from "sap/m/SearchField";
import { AppSettings } from "../util/AppSettings";
import { ApiServiceConfig } from "../helper/ApiServiceConfig";
import SegmentedButton from "sap/m/SegmentedButton";
import Select from "sap/m/Select";
import BaseController from "./Base.controller";

export default class Cities extends BaseController {
    public formatter = formatter;

    /**
     * Called when the controller is instantiated. Initializes the controller and fetches initial city data.
     */
    public onInit(): void {
        const appConfig: ApiServiceConfig = this.getOwnerComponent()?.getManifestEntry("sap.app").dataSources.apiService.uri;
        const appSettings = new AppSettings(appConfig);
        this._citiesService = CityService.getInstance(appSettings.getServiceUrl());
        this.fetchCities();
    }

    public onAfterRendering(): void {
        this._filterPropertySelect = this.byId('filterProperty') as Select;
        this._filterOperatorButton = this.byId('filterOperationSelect') as SegmentedButton;
        this._filterValueInput = this.byId('filterValue') as Input
        this.setupFilterOptions(this._filterPropertySelect.getSelectedKey());
        this.updateCurrentSearch({
            filterProperty: this._filterPropertySelect.getSelectedKey(), 
            filterOperator: this._filterOperatorButton.getSelectedKey()
        })
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
        this._citiesService.createCity(city)
            .then(() => MessageToast.show('City Created Successfully.'))
            .catch(() => MessageToast.show('Error creating city.'));
        this.handleCloseCreateCityDialog();
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
        const mParams = oEvent.getParameters() as SortParameters;
        this._currentSort = {
            sortBy: mParams.sortItem.getKey(),
            order: mParams.sortDescending ? SortOrder.DESCENDING : SortOrder.ASCENDING
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
        const searchField = oEvent.getSource() as SearchField;
        const nameChunk = searchField.getValue();
        this.updateCurrentSearch({ 
            filterProperty: "name", 
            filterOperator: ComparisonOperator.CONTAINS, 
            filterValue: nameChunk 
        });
        this.updateCitiesData();
        this.updateSearchFilterProperty(this._currentSearch.filterProperty, this._currentSearch.filterOperator, this._currentSearch.filterValue);
    }

    public handleFilterPropertyChange(oEvent: Event): void {
        const selectedProperty = this._filterPropertySelect.getSelectedKey()
        this.setupFilterOptions(selectedProperty);
        this.updateCurrentSearch({ filterProperty: selectedProperty });
    }

    public handleFilterOperationSelect(oEvent: Event): void {
        this.updateCurrentSearch({ filterOperator: this._filterOperatorButton.getSelectedKey() });
    }

    public handleApplyFilter(oEvent: Event): void {
        this.updateCurrentSearch({filterValue: this._filterValueInput.getValue()});
        this.updateSearchFilterProperty(this._currentSearch.filterProperty, this._currentSearch.filterOperator, this._currentSearch.filterValue)
        this.updateCitiesData()
    }
}

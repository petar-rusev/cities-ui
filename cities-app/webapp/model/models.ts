import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import BindingMode from "sap/ui/model/BindingMode";

export default {
    /**
     * Creates a device model based on the SAP UI5 Device API.
     * The model is set to OneWay binding mode, meaning it's read-only from the UI's perspective.
     * @returns {JSONModel} A JSONModel instance containing the device information.
     */
    createDeviceModel () {
        const model = new JSONModel(Device);
        model.setDefaultBindingMode(BindingMode.OneWay);
        return model;
    },

    /**
     * Creates a model for managing cities data.
     * The initial state includes an empty data array, and default filter and sorter texts.
     * This model is set to TwoWay binding mode, allowing read and write operations.
     * The size limit is set to the maximum safe integer to accommodate a large number of entries.
     * @returns {JSONModel} A JSONModel instance for managing cities data.
     */
    createCitiesModel () {
        const model = new JSONModel(
            {
                data:[], 
                filter:'No Filter Applied', 
                sorter: 'No Sorter Applied'
            });
        model.setDefaultBindingMode(BindingMode.TwoWay);
        model.setSizeLimit(Number.MAX_SAFE_INTEGER);
        return model;
    }
}

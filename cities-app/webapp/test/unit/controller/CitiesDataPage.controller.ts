/*global QUnit*/
import Controller from "com/sap/citiesapp/controller/CitiesData.controller";

QUnit.module("CitiesData Controller");

QUnit.test("I should test the CitiesData controller", function (assert: Assert) {
	const oAppController = new Controller("CitiesData");
	oAppController.onInit();
	assert.ok(oAppController);
});
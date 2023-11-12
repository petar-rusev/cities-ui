/*global QUnit*/
import Controller from "com/sap/citiesapp/controller/Cities.controller";

QUnit.module("Cities Controller");

QUnit.test("I should test the Cities controller", function (assert: Assert) {
	const oAppController = new Controller("Cities");
	oAppController.onInit();
	assert.ok(oAppController);
});
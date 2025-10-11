import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import List from "sap/m/List";
import ListBinding from "sap/ui/model/ListBinding";

/**
 * @namespace com.logaligroup.invoices.controller
 */

export default class InvoicesList extends Controller {

    public onInit () : void {
        this.currencyModel();
    }

    private currencyModel () : void {
        let data = {
            usd: "USD"
        };
        const model = new JSONModel(data);
        this.getView()?.setModel(model, "currency");
    }

    public onSearchPress (event : SearchField$SearchEvent) : void {
        const sQuery = event.getParameter("query");
        let aFilters = [];

        if (sQuery) {
            aFilters.push(
                new Filter({
                    filters:[
                        new Filter("ProductName",FilterOperator.Contains, sQuery),
                        new Filter("ShipperName",FilterOperator.Contains, sQuery)
                    ],
                    and: false
                })
            );
        }

        const list = this.byId("List") as List;
        const binding = list.getBinding("items") as ListBinding;
        binding.filter(aFilters);
    }

}
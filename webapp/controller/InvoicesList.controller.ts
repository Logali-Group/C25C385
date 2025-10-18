import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import List from "sap/m/List";
import ListBinding from "sap/ui/model/ListBinding";
import Component from "../Component";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import Context from "sap/ui/model/odata/v2/Context";

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

    public onNavToDetail (event : Event) : void {
        const item = event.getSource() as ObjectListItem;
        const bindingContext = item.getBindingContext("northwind") as Context;
        const path = bindingContext.getPath();
        console.log(path);
        console.log(window.encodeURIComponent(path));
        // console.log(bindingContext.getObject());                     //Obtiene el objeto completo
        // console.log(bindingContext.getPath());                       //Obtiene la uri o la url de un objeto en especifico
        // console.log(bindingContext.getProperty("ProductName"));      //Obtiene el valor de un campo especifico
        const router = (this.getOwnerComponent() as Component).getRouter();
        router.navTo("RouteDetails",{
            path: window.encodeURIComponent(path)
        });
    }

}
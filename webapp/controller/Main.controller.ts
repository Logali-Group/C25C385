import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.logaligroup.invoices.controller
 */


export default class Main extends Controller {

    public onInit () : void | undefined {
        this.loadModel();
    }

    private loadModel () : void {
        let data = {
            recipient: {
                name: "World"
            }
        };
        let model = new JSONModel(data);
        this.getView()?.setModel(model,"view");
    }



}
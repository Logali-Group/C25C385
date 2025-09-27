import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import View from "sap/ui/core/mvc/View";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UIComponent from "sap/ui/core/UIComponent";
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

    public onShowMessage () : void {
        //Primera forma
        //let resourceModel = (this.getView() as View).getModel("i18n") as ResourceModel;
        //Segunda forma
        let resourceModel = (this.getOwnerComponent() as UIComponent).getModel("i18n") as ResourceModel;
        let sMessage =  (resourceModel.getResourceBundle() as ResourceBundle).getText("helloWorld") as string;
        MessageToast.show(sMessage);
        
    }

}
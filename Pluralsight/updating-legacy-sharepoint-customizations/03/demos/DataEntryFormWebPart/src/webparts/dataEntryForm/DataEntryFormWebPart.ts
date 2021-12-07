import { 
  SPHttpClient, 
  SPHttpClientResponse, 
  ISPHttpClientOptions
} from "@microsoft/sp-http";
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './DataEntryFormWebPart.module.scss';
import * as strings from 'DataEntryFormWebPartStrings';

import * as $ from 'jquery';

export interface IDataEntryFormWebPartProps {
  runningListName: string;
}

export default class DataEntryFormWebPart extends BaseClientSideWebPart<IDataEntryFormWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <h2>Carved Rock Running Challenge</h2>
      <p>Enter your miles below.</p>
      Date: <input type="text" id="txtDate" /><br />
      Miles: <input type="text" id="txtMiles" /><br />
      <input id="btnSubmit" type="button" value="Submit" /><br />
      <div id="divOutput"></div>`; 
      
    this.addEventHandler();
  }

  private addEventHandler(): void {  
    this.domElement.querySelector("#btnSubmit").addEventListener("click", () => {  
      var username = this.context.pageContext.user.displayName;
      var d = $("#txtDate").val();
      var miles = $("#txtMiles").val();

      const options: ISPHttpClientOptions = {
        headers: {
          "Accept": "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "OData-Version": ""
        },
        body: JSON.stringify({
          __metadata: { type: `SP.Data.${this.properties.runningListName}ListItem` },
          Title: username,
          Date: d,
          Miles: miles
        })
      };
      
      this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('${this.properties.runningListName}')/items`, 
        SPHttpClient.configurations.v1, options).then((response: SPHttpClientResponse) => {  
          response.json().then((responseJSON: any) => {  
            $("#divOutput").html("Item successfully added!");  
          });  
      }); 
    
    }); 
  }  

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('runningListName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
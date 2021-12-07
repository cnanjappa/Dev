import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import {PageContext} from '@microsoft/sp-page-context';
declare var jQuery;
import 'jquery';

import styles from './SliderWebPart.module.scss';
import * as strings from 'SliderWebPartStrings';

export interface ISliderWebPartProps {
  ListName: string;
  ViewName: string;
  Previous:string;
  Next: string;
  Arrows:boolean;
  CustomCSS:string;
}

export default class SliderWebPart extends BaseClientSideWebPart<ISliderWebPartProps> {

  public render(): void {
    
    require('./unslider-min');
    require('./Slider');

      this.domElement.innerHTML = `
      <style type="text/css">
      `
      +
      this.properties.CustomCSS
      +
      `
      </style>
      <div class="${styles.SliderSpFx}">
        <div class="Slider"><ul id="PAITSlides"></ul></div>
      </div>`;

    jQuery().Slider({
      listName:  this.properties.ListName, //name of Promoted Links list to use for slides
      viewTitle: this.properties.ViewName, //name of the view to use
      prev: this.properties.Previous, //HTML for the previous arrow
      next: this.properties.Next, //HTML for the next arrow
      autoplay: true, 
      infinite: true,
      animation: 'horizontal',
      arrows: this.properties.Arrows,
      dots: true,
      keys: true,
      delay: 3000,
      url: this.context.pageContext.site.absoluteUrl
    });         
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                PropertyPaneTextField('ListName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('ViewName', {
                  label: strings.ViewNameFieldLabel
                }),
                PropertyPaneTextField('Next', {
                  label: strings.NextFieldLabel
                }),
                PropertyPaneTextField('Previous', {
                  label: strings.PreviousFieldLabel
                }),
                PropertyPaneCheckbox('Arrows', {
                  text: strings.ArrowsFieldLabel,
                  checked:true
                }),
                PropertyPaneTextField('CustomCSS', {
                  label: strings.CustomCSSFieldLabel,
                  multiline:true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

import { Version } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './ContentEditorWebPart.module.scss';
import * as strings from 'ContentEditorWebPartStrings';

import * as jQuery from 'jquery';
declare var window: any;

export interface IContentEditorWebPartProps {
  description: string;
  content:string;
  contentLink:string;
}

export default class ContentEditorWebPart extends BaseClientSideWebPart<IContentEditorWebPartProps> {

  public _renderEdit(): void {    
    this.domElement.innerHTML =  `
    <div class="${ styles.contentEditor }">
      <div class="${ styles.container }">
        <div class="${ styles.row }">
          <div class="${ styles.column }">
            <span class="${ styles.title }">Welcome to Content Editor Webpart!</span>
            <p class="${ styles.subTitle }">Allows authors to enter rich text conent.</p>    
            <p class="${ styles.subTitle }">Environment Type - ${Environment.type}</p>             
          </div>
        </div>
      </div>
    </div>`;
  }

  public _renderView(): void {
    const uid: string = String(Math.random()).substr(2);
    const contentPlaceholderId: string = 'modernCEWP_ContentPlaceholder_' + uid;
    const contentLinkPlaceholderId: string = 'modernCEWP_ContentLinkPlaceholder_' + uid;
    const html: string = this.properties.content;
    const path: string = this.properties.contentLink;
    if (html !== '') {
      this.domElement.innerHTML = '<div id="' + contentPlaceholderId + '"></div>';
      jQuery('#' + contentPlaceholderId).html(html);
    }
    if (path !== '') {
      this.domElement.innerHTML += '<div id="' + contentLinkPlaceholderId + '"></div>';    
      jQuery.get(path).done((data) => {
        jQuery('#' + contentLinkPlaceholderId).html(data);
      }).fail((err) => {
        const str: string = `
        <div class="${ styles.contentEditor}">
            <div class="${ styles.row}">
              <div class="${ styles.title}">${strings.FailedToLoadLabel}</div>
              <div style="margin-bottom:5px;">${this.properties.contentLink}</div>
              <div class="${ styles.title}">${strings.ErrorMessageLabel}</div>
              ${err.responseText}
            </div>
        </div>`;
        jQuery('#' + contentLinkPlaceholderId).html(str);
      });
    }
    if (path === '' && html === '') {
      const str: string = `
        <div class="${ styles.contentEditor}">
          <div class="${ styles.container}">
            <div class="${ styles.row}">
              <div class="${ styles.title}">${strings.DispModeEmpty}</div>
            </div>
          </div>
        </div>`;
      this.domElement.innerHTML = str;
    }
  }

  public render(): void {
     // Detect display mode on classic and modern pages pages
     if (Environment.type === EnvironmentType.ClassicSharePoint) {
      let isInEditMode: boolean;
      let interval: number;
      let _this = this;
      interval = setInterval(function (): void {
        if (typeof (<any>window).SP.Ribbon !== 'undefined') {
          isInEditMode = (<any>window).SP.Ribbon.PageState.Handlers.isInEditMode();
          if (isInEditMode) {
            // Classic SharePoint in Edit Mode
            _this._renderEdit();
          } else {
            // Classic SharePoint in Read Mode
            _this._renderView();
          }
          clearInterval(interval);
        }
      }, 100);
    } else if (Environment.type === EnvironmentType.SharePoint) {
      if (this.displayMode === DisplayMode.Edit) {
        // Modern SharePoint in Edit Mode
        this._renderEdit();
      } else if (this.displayMode === DisplayMode.Read) {
        // Modern SharePoint in Read Mode
        this._renderView();
      }
    }
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
              groupFields: [
                PropertyPaneTextField('contentLink', {
                  label: strings.ContentLinkFieldLabel,
                  multiline:true,
                  rows:2,
                  resizable:true
                }),
                PropertyPaneTextField('content', {
                  label: strings.ContentFieldLabel,
                  multiline:true,
                  rows:20,
                  resizable:true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

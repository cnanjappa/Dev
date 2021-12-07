import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GloboSkeletonWebPart.module.scss';
import * as strings from 'GloboSkeletonWebPartStrings';

import { Log } from '@microsoft/sp-core-library';
const LOG_SOURCE: string = 'Globo-SkeletonWebPart';

export interface IGloboSkeletonWebPartProps {
  description: string;
}

export default class GloboSkeletonWebPart extends BaseClientSideWebPart<IGloboSkeletonWebPartProps> {

  public render(): void {
    Log.verbose(LOG_SOURCE, 'Hello from Globomantics Skeleton Web Part', this.context.serviceScope);

    this.domElement.innerHTML = `
      <div class="${ styles.globoSkeleton }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

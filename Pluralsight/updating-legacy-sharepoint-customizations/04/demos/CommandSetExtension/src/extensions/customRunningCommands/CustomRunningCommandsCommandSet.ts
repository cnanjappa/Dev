import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CustomRunningCommandsCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomRunningCommandsCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'CustomRunningCommandsCommandSet';

export default class CustomRunningCommandsCommandSet extends BaseListViewCommandSet<ICustomRunningCommandsCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CustomRunningCommandsCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const cmdCopyForToday: Command = this.tryGetCommand('COMMAND_COPY_FOR_TODAY');
    const cmdCopyForNextWeek: Command = this.tryGetCommand('COMMAND_COPY_FOR_NEXT_WEEK');
    if (cmdCopyForToday && cmdCopyForNextWeek) {
      // These commands should be hidden unless exactly one row is selected.
      cmdCopyForToday.visible = event.selectedRows.length === 1;
      cmdCopyForNextWeek.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_COPY_FOR_TODAY':
        location.href = `${this.context.pageContext.web.absoluteUrl}/SitePages/CopyToday.aspx?ItemID=${event.selectedRows[0].getValueByName("ID")}`;
        break;
      case 'COMMAND_COPY_FOR_NEXT_WEEK':
        location.href = `${this.context.pageContext.web.absoluteUrl}/SitePages/CopyWeek.aspx?ItemID=${event.selectedRows[0].getValueByName("ID")}`;
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}

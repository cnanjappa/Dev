declare interface IContentEditorWebPartStrings {
  WebPartHasPageContextLabel: any;
  Yes: string;
  No: string;
  AddspPageContextInfo: string;
  WebPartHasHTMLLabel: string;
  WebPartHasContentLinkLabel: string;
  PathNotSet: string;
  DispModeEmpty: string;
  ErrorMessageLabel: string;
  FailedToLoadLabel: string;
  WebPartCurrentPathLabel: string;
  Link: string;
  BasicGroupName: string;
  ContentlinkFieldLabel: string;
  ContentFieldLabel: string;
  webPartName: string;
  webPartSettings: string;
}

declare module 'ContentEditorWebPartStrings' {
  const strings: IContentEditorWebPartStrings;
  export = strings;
}

declare interface IContentEditorWebPartStrings {
  PropertyPaneDescription: string;
  ContentLinkFieldLabel: string;
  ContentFieldLabel: string;
  DispModeEmpty:string;
  FailedToLoadLabel:string;
  ErrorMessageLabel:string;
}

declare module 'ContentEditorWebPartStrings' {
  const strings: IContentEditorWebPartStrings;
  export = strings;
}

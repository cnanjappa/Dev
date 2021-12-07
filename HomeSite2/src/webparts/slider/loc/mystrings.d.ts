declare interface ISliderWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
  ViewNameFieldLabel: string;
  NextFieldLabel: string;
  PreviousFieldLabel: string;
  ArrowsFieldLabel: string;
  CustomCSSFieldLabel: string;
}

declare module 'SliderWebPartStrings' {
  const strings: ISliderWebPartStrings;
  export = strings;
}

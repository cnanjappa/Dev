declare interface ICustomRunningCommandsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CustomRunningCommandsCommandSetStrings' {
  const strings: ICustomRunningCommandsCommandSetStrings;
  export = strings;
}

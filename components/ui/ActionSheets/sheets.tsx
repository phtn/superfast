import {
  registerSheet,
  type SheetDefinition,
} from "react-native-actions-sheet";
import GetStartedSheet from "./GetStarted";
registerSheet("get-started", GetStartedSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "get-started": SheetDefinition;
  }
}

export {};

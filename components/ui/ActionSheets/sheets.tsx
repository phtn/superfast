import {
  registerSheet,
  type SheetDefinition,
} from "react-native-actions-sheet";
import GetStartedSheet from "./GetStarted";
import UploadOptionSheet from "./UploadOptions";
registerSheet("get-started", GetStartedSheet);
registerSheet("upload-options", UploadOptionSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "get-started": SheetDefinition;
    "upload-options": SheetDefinition;
  }
}

export {};

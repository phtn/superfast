import { toRN } from "../components/icons/extractor";
import { icons } from "../components/icons/icons";
import * as fs from "fs";

const transformedIcons = Object.entries(icons).reduce(
  (acc, [name, icon]) => ({
    ...acc,
    [name]: {
      props: toRN(icon.symbol),
      set: icon.set,
    },
  }),
  {},
);

const output = `// This file is auto-generated. Do not edit manually.
export const icons = ${JSON.stringify(transformedIcons, null, 2)};
`;

fs.writeFileSync("./components/icons/transformed-icons.ts", output);

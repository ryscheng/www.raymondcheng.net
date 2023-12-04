import { initPlasmicLoader } from "@plasmicapp/loader-react";
import { DocusaurusContextProvider } from "./components/DocusaurusContextProvider";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "rx1kpYqGUzeEvbcptJ7ip8",  // ID of a project you are using
      token: "xOlEK1egyud2xBm4rs9l78wgwVCIU7H8TlVopaSw9QaflYenysXX59lgGp8ZfgHc3L2yHNczdeWIfhXIw"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: false,
});

PLASMIC.registerComponent(DocusaurusContextProvider, {
  name: "DocusaurusContextProvider",
  description: "Docusaurus Context",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Placeholder",
      },
    },
  },
  providesData: true,
  importPath: "./components/DocusaurusContextProvider",
});
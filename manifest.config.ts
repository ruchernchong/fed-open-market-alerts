import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const { version } = packageJson;

export default defineManifest(() => ({
  manifest_version: 3,
  name: "Fed Markets Monitor",
  version,
  description:
    "Monitor Federal Reserve reverse repo operations and market data",

  action: {
    default_popup: "index.html",
    default_title: "Fed Markets Monitor",
  },

  background: {
    service_worker: "src/background.ts",
  },

  permissions: ["notifications", "alarms", "storage"],

  host_permissions: [
    "https://markets.newyorkfed.org/*",
    "http://localhost:*/*",
  ],

  icons: {
    16: "icon-16.png",
    48: "icon-48.png",
    128: "icon-128.png",
  },
}));

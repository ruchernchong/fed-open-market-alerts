import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const { version } = packageJson;

export default defineManifest(() => ({
  manifest_version: 3,
  name: "Fed Open Market Alerts",
  version,
  description:
    "Monitor Federal Reserve Open Market Operations with automated alerts",

  action: {
    default_popup: "index.html",
    default_title: "Fed Open Market Alerts",
  },

  background: {
    service_worker: "src/background.ts",
  },

  permissions: ["notifications", "alarms", "storage"],

  host_permissions: ["https://markets.newyorkfed.org/*", "*://localhost:*/*"],

  icons: {
    16: "icon-16.png",
    48: "icon-48.png",
    128: "icon-128.png",
  },
}));

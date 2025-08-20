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

  host_permissions: [
    "https://markets.newyorkfed.org/*",
    "http://localhost:*/*",
  ],

  icons: {
    16: "public/vite.svg",
    48: "public/vite.svg",
    128: "public/vite.svg",
  },
}));

import { useEffect } from "react";
import { CHROME_WEB_STORE_URL, EXTENSION_ID, EXTENSION_NAME } from "@/config";

export const Extension = () => {
  useEffect(() => {
    location.replace(
      `${CHROME_WEB_STORE_URL}/detail/${EXTENSION_NAME}/${EXTENSION_ID}`,
    );
  }, []);

  return null;
};

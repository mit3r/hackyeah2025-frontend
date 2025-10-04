import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";

import index from "@locales/en/index.json";

export const languages = ["en", "pl"] as const;
export type Language = (typeof languages)[number];

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "game";
    resources: {
      index: typeof index;
    };
  }
}

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    lng: "pl",
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    ns: ["index"],
  });

export default i18next;

/* eslint-disable no-undef */
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationENG from "./locales/en/translation.json";
import translationRUS from "./locales/ru/translation.json";
import translationUZB from "./locales/uz/translation.json";

// the translations
const resources = {
  uz: {
    translation: translationUZB,
  },
  ru: {
    translation: translationRUS,
  },
  en: {
    translation: translationENG,
  },
};

const language = localStorage.getItem("LANGUAGE");

if (!language) {
  // eslint-disable-next-line no-undef
  localStorage.setItem("LANGUAGE", "uz");
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("LANGUAGE") || "uz",
    fallbackLng: "uz", 

    keySeparator: false, 

    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

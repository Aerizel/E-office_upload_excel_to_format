"use client";
import { useContext } from "react";
import { LanguageContext } from "../app/LanguageContext";
import Image from "next/image";

export function SwitchLanguage() {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) return null;

  const { language, toggleLanguage } = languageContext;

  return (
    <div onClick={toggleLanguage}>
      {language === "en" ? (
        <Image src="/uk.png" alt="EN" width={40} height={40} />
      ) : (
        <Image src="/thailand.png" alt="TH" width={40} height={40} />
      )}
    </div>
  );
}

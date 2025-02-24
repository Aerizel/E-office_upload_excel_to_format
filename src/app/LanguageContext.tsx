"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("changeLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "th" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("changeLanguage", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

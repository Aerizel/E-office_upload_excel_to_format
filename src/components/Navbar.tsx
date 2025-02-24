"use client";
import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import Image from "next/image";
import Link from "next/link";
import { SwitchLanguage } from "./SwitchLanguage";
import { LanguageContext } from "../app/LanguageContext";

const startTh = (
  <div className="flex flex-row gap-2 justify-center items-center">
    <Link href={"/"} className="w-auto h-auto">
      <Image
        alt="logo"
        src="/ntLogo.jpg"
        width={100}
        height={100}
        className="w-[100px] h-auto mr-2"
        priority={true}
      />
    </Link>
    <h1 className="text-2xl font-bold">ระบบเเปลงเอกสาร</h1>
  </div>
);
const startEn = (
  <div className="flex flex-row gap-2 justify-center items-center">
    <Link href={"/"} className="w-auto h-auto">
      <Image
        alt="logo"
        src="/ntLogo.jpg"
        width={100}
        height={100}
        className="w-[100px] h-auto mr-2"
        priority={true}
      />
    </Link>
    <h1 className="text-2xl font-bold">Converting Document</h1>
  </div>
);

const end = (
  <div className="flex flex-row gap-2 justify-center items-center p-6">
    <SwitchLanguage />
  </div>
);

export default function Navbar() {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) return null;
  const { language } = languageContext;

  return (
    <div className="card">
      {language === "en" ? (
        <Menubar start={startEn} end={end} className="bg-yellow-200" />
      ) : (
        <Menubar start={startTh} end={end} className="bg-yellow-200" />
      )}
    </div>
  );
}

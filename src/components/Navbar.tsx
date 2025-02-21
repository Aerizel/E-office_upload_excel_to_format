"use client";
import React from "react";
import { Menubar } from "primereact/menubar";
import Image from "next/image";
import Link from "next/link";

const start = (
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

export default function Navbar() {
  return (
    <div className="card ">
      <Menubar className="bg-yellow-200" start={start}/>
    </div>
  );
}

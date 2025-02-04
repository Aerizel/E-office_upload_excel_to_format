"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import Image from "next/image";
import Link from "next/link";

const start = (
  <Link href={"/"}>
    <Image
      alt="logo"
      src="/ntLogo.jpg"
      width="100"
      height="100"
      className="mr-2"
    />
  </Link>
);

export default function Navbar() {
  const router = useRouter();
  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => router.push("/"),
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Upload",
          icon: "pi pi-bolt",
          command: () => router.push("/upload"),
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} start={start} />
    </div>
  );
}

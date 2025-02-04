"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "../components/DirectionAwareHover";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import { Carousel } from "@/components/Carousel";
import { ColourfulText } from "@/components/ColorfulText";
import { FlipWords } from "@/components/FlipWords";

const word =
  "E-Office : ระบบบริหารจัดการสำนักงาน สนับสนุนกระบวนการทำงานภายในของภาครัฐ เพื่อขับเคลื่อนรัฐบาลดิจิทัล";
const words = ["How to use it?", "วิธีใช้งาน", "beautiful", "modern"];

const imageUrl = "/ntLogo.jpg";

const slideData = [
  {
    title: "Mystic Mountains",
    button: "Explore Component",
    src: "/ntLogo.jpg",
  },
  {
    title: "Urban Dreams",
    button: "Explore Component",
    src: "/ntLogo.jpg",
  },
  {
    title: "Neon Nights",
    button: "Explore Component",
    src: "/ntLogo.jpg",
  },
  {
    title: "Desert Whispers",
    button: "Explore Component",
    src: "/ntLogo.jpg",
  },
];

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-5">
      <div className="flex flex-row justify-center items-center">
        <TextGenerateEffect words={word} />
      </div>
      {/* <div className="flex flex-row h-screen">
        <div className="w-[50%] h-[50%]">
          <div className="h-[80%] w-full flex items-center justify-center relative overflow-hidden bg-black">
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
              The best <ColourfulText text="components" /> <br /> you will ever
              find
            </h1>
          </div>
        </div>
        <Carousel slides={slideData} />
      </div> */}
      <div className="flex flex-col gap-5 w-screen h-screen">
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
          <ColourfulText text="How to use it?"/>
        </h1>
        <div className="w-screen h-[40rem] relative  flex flex-row items-center justify-center gap-10">
          <DirectionAwareHover imageUrl="/upload.jpg">
            <p className="font-bold text-xl">Step1 : Upload File</p>
            <p className="font-normal text-sm">
              You can upload .xls or .xlsx file.{" "}
            </p>
          </DirectionAwareHover>
          <DirectionAwareHover imageUrl="/convert.jpg">
            <p className="font-bold text-xl">Step2 : Convert File </p>
            <p className="font-normal text-sm">
              Convert File .xls or .xlsx to specific format{" "}
            </p>
          </DirectionAwareHover>
          <DirectionAwareHover imageUrl="/download.jpg">
            <p className="font-bold text-xl">Step3 : Download File</p>
            <p className="font-normal text-sm">
              You can download new file by pressing green button.{" "}
            </p>
          </DirectionAwareHover>
        </div>
        <div className="w-screen h-[40rem] relative  flex flex-row items-center justify-center gap-10">
          <DirectionAwareHover imageUrl="/downloadall.jpg">
            <p className="font-bold text-xl">
              Step4 : Download all success files
            </p>
            <p className="font-normal text-sm">
              You can use download all button to download success files in one
              click.{" "}
            </p>
          </DirectionAwareHover>
          <DirectionAwareHover imageUrl="/deleteall.jpg">
            <p className="font-bold text-xl">Step5 : Convert File </p>
            <p className="font-normal text-sm">
              Convert File .xls or .xlsx to specific format{" "}
            </p>
          </DirectionAwareHover>
        </div>
      </div>
    </div>
  );
}

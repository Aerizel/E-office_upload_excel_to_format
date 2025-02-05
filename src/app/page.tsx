"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "../components/DirectionAwareHover";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import { Carousel } from "@/components/Carousel";
import { ColourfulText } from "@/components/ColorfulText";
import { BentoGrid, BentoGridItem } from "../components/BentoGrid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import UploadFileForm from "./upload/page";

const word =
  "E-Office : ระบบบริหารจัดการสำนักงาน สนับสนุนกระบวนการทำงานภายในของภาครัฐ เพื่อขับเคลื่อนรัฐบาลดิจิทัล";
const words = ["How to use it?", "วิธีใช้งาน", "beautiful", "modern"];

export default function Page() {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );

  const items = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <Skeleton />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      header: <Skeleton />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Pursuit of Knowledge",
      description: "Join the quest for understanding and enlightenment.",
      header: <Skeleton />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Joy of Creation",
      description: "Experience the thrill of bringing ideas to life.",
      header: <Skeleton />,
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Spirit of Adventure",
      description: "Embark on exciting journeys and thrilling discoveries.",
      header: <Skeleton />,
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <div className="w-screen h-screen flex flex-col gap-4 ">
      <div className="flex flex-row justify-center items-center p-5">
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
        <UploadFileForm />
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
          <ColourfulText text="How to use it?" />
        </h1>
        {/* <div className="w-screen h-[40rem] relative  flex flex-row items-center justify-center gap-10">
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
        </div> */}

        <div className="w-screen bg-amber-100 py-10 px-4 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Step 1 */}
            <StepCard
              imageSrc="/uploadFile.jpg"
              stepNumber="Step 1"
              description="Users can upload a file by clicking the upload button."
              note="File Type: .xls, .xlsx"
            />

            {/* Step 2 */}
            <StepCard
              imageSrc="/convertImage.jpg"
              stepNumber="Step 2"
              description="Users can click convert file to generate a new Excel file format."
            />

            {/* Step 3 */}
            <StepCard
              imageSrc="/downloadFile.jpg"
              stepNumber="Step 3"
              description="Users can click download file to download the successfully converted file."
            />

            {/* Step 4 */}
            <StepCard
              imageSrc="/downloadAllFiles.jpg"
              stepNumber="Step 4"
              description="ผู้ใช้สามารถกดปุ่ม 'ดาวน์โหลดไฟล์ทั้งหมด' เพื่อดาวน์โหลดไฟล์ที่ผ่านการเเปลงสำเร็จ"
            />
          </div>

          {/* Step 5 - Centered */}
          <div className="flex justify-center mt-10">
            <StepCard
              imageSrc="/deleteFiles.jpg"
              stepNumber="Step 5"
              description="Users can delete all uploaded files by clicking the delete button."
              customWidth="w-[60%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  imageSrc,
  stepNumber,
  description,
  note,
  customWidth = "w-full",
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${customWidth} bg-white p-6 rounded-2xl shadow-lg`}
    >
      <Image
        alt="Step image"
        className="w-full h-64 object-contain rounded-xl"
        width={1000}
        height={1000}
        src={imageSrc}
      />
      <div className="mt-6 space-y-3">
        <h1 className="text-3xl lg:text-4xl font-bold text-black">
          {stepNumber}
        </h1>
        <p className="text-gray-700 text-lg">{description}</p>
        {note && <p className="text-gray-500 text-sm">{note}</p>}
      </div>
    </div>
  );
}

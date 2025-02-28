"use client";
import { useContext } from "react";
import Image from "next/image";
import UploadFileForm from "./upload/page";
import { LanguageContext } from "../app/LanguageContext";
import { COLORS } from "../lib/colors";

export default function Page() {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) return null;

  const { language } = languageContext;

  return (
    <div className="w-screen h-screen flex flex-col gap-4">
      <div className="flex flex-row justify-center items-center p-5 bg-yellow-100">
        <h1
          className=" dark:text-white text-4xl lg:text-6xl leading-loose tracking-wide "
          style={{ color: COLORS.gray }}
        >
          {language === "en"
            ? "E-Office: An office management system that supports internal workflow processes within the government to drive digital governance."
            : "E-Office : ระบบบริหารจัดการสำนักงาน สนับสนุนกระบวนการทำงานภายในของภาครัฐ เพื่อขับเคลื่อนรัฐบาลดิจิทัล"}
        </h1>
      </div>
      <div className="flex flex-col gap-5 w-screen h-screen">
        <UploadFileForm />
        <h1
          className="text-2xl md:text-5xl lg:text-7xl font-bold text-center relative z-2 font-sans"
          style={{ color: COLORS.gray }}
        >
          {language === "en" ? "How to use it?" : "วิธีการใช้งาน"}
        </h1>
        <div className="w-screen bg-amber-100 py-10 px-4 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <StepCard
              imageSrc="/uploadFile.jpg"
              stepNumber={language === "en" ? "Step 1" : "ขั้นตอนที่ 1"}
              description={
                language === "en"
                  ? "Users can upload files by clicking the 'Choose File' button and selecting a file."
                  : `ผู้ใช้สามารถอัพโหลดไฟล์โดยการกดที่ปุ่ม 'เลือกไฟล์' และเลือกไฟล์ที่ต้องการ`
              }
              note="File Type: .xls, .xlsx"
            />
            <StepCard
              imageSrc="/convertFiles.jpg"
              stepNumber={language === "en" ? "Step 2" : "ขั้นตอนที่ 2"}
              description={
                language === "en"
                  ? "Users can click convert file to generate a new Excel file format."
                  : "ผู้ใช้สามารถกดปุ่ม 'แปลงไฟล์' เพื่อสร้างไฟล์ Excel รูปแบบใหม่"
              }
            />

            <StepCard
              imageSrc="/downloadFile.jpg"
              stepNumber={language === "en" ? "Step 3" : "ขั้นตอนที่ 3"}
              description={
                language === "en"
                  ? "Users can click download file to download the successfully converted file."
                  : "ผู้ใช้สามารถกดปุ่ม 'ดาวน์โหลดไฟล์' เพื่อดาวน์โหลดไฟล์ที่แปลงเสร็จแล้ว"
              }
            />

            <StepCard
              imageSrc="/downloadAllFiles.jpg"
              stepNumber={language === "en" ? "Step 4" : "ขั้นตอนที่ 4"}
              description={
                language === "en"
                  ? "Users can click 'Download All Files' to download all converted files."
                  : "ผู้ใช้สามารถกดปุ่ม 'ดาวน์โหลดไฟล์ทั้งหมด' เพื่อดาวน์โหลดไฟล์ที่ผ่านการแปลงสำเร็จ"
              }
            />
          </div>

          <div className="flex justify-center mt-10">
            <StepCard
              imageSrc="/deleteAllFiles.jpg"
              stepNumber={language === "en" ? "Step 5" : "ขั้นตอนที่ 5"}
              description={
                language === "en"
                  ? "Users can delete all uploaded files by clicking the delete button."
                  : "ผู้ใช้สามารถลบไฟล์ทั้งหมดที่อัพโหลดโดยการกดปุ่ม 'เอารายการทั้งหมดออก'"
              }
              customWidth="w-[60%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ReactNode } from "react";

interface StepCardProps {
  imageSrc: string;
  stepNumber: string;
  description: ReactNode;
  note?: string;
  customWidth?: string;
}

function StepCard({
  imageSrc,
  stepNumber,
  description,
  note,
  customWidth = "w-full",
}: StepCardProps) {
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
        <div className="text-gray-700 text-lg">{description}</div>
        {note && <p className="text-gray-500 text-sm">{note}</p>}
      </div>
    </div>
  );
}

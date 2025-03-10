import { FONT_SIZE } from "../../config/fontSize";
import { UPLOAD_STATUS } from "../../config/uploadStatus";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import Swal from "sweetalert2";
import { LanguageContext } from "../../app/LanguageContext";
import { useContext } from "react";

interface cardFilesProps {
  index: number;
  name: string;
  size: number;
  status: string;
  error: string;
  data: Blob | null;
  removeItem: (index: number) => void;
}

export const CardFiles: React.FC<cardFilesProps> = ({
  index,
  name,
  size,
  status,
  error,
  data,
  removeItem,
}) => {
  // Change language
  const languageContext = useContext(LanguageContext);
  if (!languageContext) return null;
  const { language } = languageContext;
  
  const paddingBtnText = language === "en" ? "Pending" : "รอการแปลงไฟล์";
  const failBtnText = language === "en" ? "Failed" : "แปลงไฟล์ไม่สำเร็จ";
  const downloadBtnText = language === "en" ? "Success" : "ดาวน์โหลดไฟล์";

  function onClick() {
    if (error) {
      Swal.fire({
        title: "Failed Uploads",
        text: error,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "All uploads were successful",
        icon: "success",
      });
    }
  }

  const handleDownload = (blob: Blob, fileName: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pending = (
    <Tag
      value={paddingBtnText}
      severity="warning"
      className={`w-[200px] h-10 px-8 py-3 truncate text-[16px]`}
    />
  );
  const failed = (
    <Button
      className={`w-[200px] h-10 px-8 py-3 gap-2 flex justify-center border-none bg-red-600 focus:shadow-lg text-sm`}
      raised
      onClick={() => onClick()}
      onTouchStart={() => onClick()}
    >
      <p className={` text-white truncate ${FONT_SIZE.normal}`}>
        {failBtnText}
      </p>
    </Button>
  );
  const cancelBtn = (
    <Button
      icon="pi pi-times"
      rounded
      text
      severity="danger"
      aria-label="Cancel"
      onClick={() => removeItem(index)}
    />
  );
  const downloadBtn = (
    <Button
      className={`w-[200px] h-10 px-10 py-3 gap-2 flex justify-center border-none bg-green-500 focus:shadow-lg text-sm`}
      raised
      onClick={() => handleDownload(data!, name)}
      onTouchStart={() => handleDownload}
    >
      <p className={` text-white truncate ${FONT_SIZE.normal}`}>
        {downloadBtnText}
      </p>
    </Button>
  );

  return (
    <div className="w-full rounded-xl flex flex-col shadow-[0px_3px_7px_1.5px_rgba(0,0,0,0.2)] bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="pt-2 pb-2 pr-[5px] flex flex-row justify-start items-center ">
          <div className="p-3 flex flex-col ">
            <div className="flex flex-row ">
              <p className={FONT_SIZE.small}>{index + 1}.</p>
              <p
                className={`text-[14px] text-graytone1 text-pretty break-words truncate overflow-hidden whitespace-nowrap max-w-[200px] ${FONT_SIZE.small}`}
              >
                {language === "en"
                  ? `File's name: ${name}`
                  : `ชื่อไฟล์ : ${name}`}
              </p>
            </div>
            <p
              className={`flex justify-start text-[14px] text-greentone1 ${FONT_SIZE.small}`}
            >
              {language === "en"
                ? `File's size : ${(size / 1024).toFixed(2)} KB`
                : `ขนาดไฟล์ : ${(size / 1024).toFixed(2)} KB`}
            </p>
          </div>
        </div>
        <div className="h-10 flex flex-row items-center">
          {status === UPLOAD_STATUS.pending
            ? pending
            : status === UPLOAD_STATUS.success && data
              ? downloadBtn
              : failed}
          {cancelBtn}
        </div>
      </div>
    </div>
  );
};

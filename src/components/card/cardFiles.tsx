import { FONT_SIZE } from "../../config/fontSize";
import { UPLOAD_STATUS } from "../../config/uploadStatus";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import Swal from "sweetalert2";

interface cardFilesProps {
  index: number;
  name: string;
  size: number;
  status: string;
  data: Blob | null;
  removeItem: (index: number) => void;
}

export const CardFiles: React.FC<cardFilesProps> = ({
  index,
  name,
  size,
  status,
  data,
  removeItem,
}) => {
  const paddingBtnText = "รอการแปลงไฟล์";
  const failBtnText = "แปลงไฟล์ไม่สำเร็จ";
  const downloadBtnText = "ดาวน์โหลดไฟล์";

  const files = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

  // Extract fail messages from nested structure
  const failMessages = files?.data?.data
    ?.map((item: { fail: string }) => item.fail)
    .filter((fail: string) => fail && fail.trim() !== ""); // Remove empty/null values

  function onClick() {
    if (failMessages.length > 0) {
      Swal.fire({
        title: "Failed Uploads",
        text: failMessages.join("\n"),
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "All uploads were successful",
        icon: "success",
      });
    }
  }

  // function onClick() {
  //   Swal.fire({ title: files.data.data[0].fail });
  // }

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
      className={`px-8 py-3 font-[family-name:var(--supermarket)] ${FONT_SIZE.normal}`}
    />
  );
  const failed = (
    <Tag
      value={failBtnText}
      severity="danger"
      className={`px-8 py-3 font-[family-name:var(--supermarket)] text-[16px] ${FONT_SIZE.normal}`}
      onClick={onClick}
    />
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
      className={`px-8 py-3 gap-2 flex justify-center border-none bg-green-500 focus:shadow-lg font-[family-name:var(--supermarket)] ${FONT_SIZE.small}`}
      raised
      onClick={() => handleDownload(data!, name)}
      onTouchStart={() => handleDownload}
    >
      <p className={`text-lg text-white`}>{downloadBtnText}</p>
    </Button>
  );

  return (
    <div className="w-full rounded-xl flex flex-col shadow-[0px_3px_7px_1.5px_rgba(0,0,0,0.2)] bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="pt-2 pb-2 pr-[5px] flex flex-row justify-start items-center">
          <div className="p-3 flex flex-col">
            <div className="flex flex-row">
              <p className={FONT_SIZE.small}>{index + 1}.</p>
              <p
                className={`text-[14px] text-graytone1 text-pretty break-words ${FONT_SIZE.small}`}
              >{`ชื่อไฟล์ : ${name}`}</p>
            </div>
            <p
              className={`flex justify-start text-[14px] text-greentone1 ${FONT_SIZE.small}`}
            >{`ขนาดไฟล์ : ${(size / 1024).toFixed(2)} KB`}</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
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

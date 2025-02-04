import { UPLOAD_STATUS } from "@/config/uploadStatus";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

interface cardFilesProps {
    index: number,
    name: string,
    size: number,
    status: string,
    data: Blob | null,
    removeItem: (index: number) => void;
}

export const CardFiles: React.FC<cardFilesProps> = ({ index, name, size, status, data, removeItem }) => {
    const paddingBtnText = "รอการแปลงไฟล์";
    const failBtnText = "แปลงไฟล์ไม่สำเร็จ";
    const downloadBtnText = "ดาวน์โหลดไฟล์";

    const handleDownload = (blob: Blob, fileName: string) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const pedding = <Tag value={paddingBtnText} severity="warning" className="px-2 py-3" />
    const failed = <Tag value={failBtnText} severity="danger" className="px-2 py-3 text-[14px]" />
    const cancelBtn = <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => removeItem(index)} />
    const downloadBtn = <Button className={`p-2 gap-2 flex justify-center border-none bg-green-500 focus:shadow-lg`} raised onClick={() => handleDownload(data!, name)} onTouchStart={() => handleDownload}>
        <p className={`text-base text-white`}>{downloadBtnText}</p>
    </Button>

    return (
        <div className='w-full rounded-xl flex flex-col shadow-[0px_3px_7px_1.5px_rgba(0,0,0,0.2)] bg-white'>
            <div className="flex flex-row justify-between items-center">
                <div className="pt-2 pb-2 pr-[5px] flex flex-row justify-start items-center">
                    <div className="p-3 flex flex-col">
                        <div className="flex flex-row">
                            <p className="text-[14px]">{index + 1}.</p>
                            <p className='text-[14px] text-graytone1 text-pretty break-words'>{`ชื่อไฟล์ : ${name}`}</p>
                        </div>
                        <p className='flex justify-start text-[14px] text-greentone1'>{`ขนาดไฟล์ : ${(size / 1024).toFixed(2)} KB`}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    {status === UPLOAD_STATUS.pedding ? pedding :
                        status === UPLOAD_STATUS.success && data ? downloadBtn : failed
                    }
                    {cancelBtn}
                </div>
            </div>
        </div>
    );
}
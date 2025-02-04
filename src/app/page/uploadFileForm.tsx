"use client"
import { useRef } from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { CardFiles } from "@/components/card/cardFiles";
import { FILE_STATUS, UPLOAD_STATUS } from "@/config/uploadStatus";
import axios from "axios";
import { filesModel, jsonFiles } from "@/app/model/filesModel";
import { base64ToBlob } from "@/utils/convertType";
import { FONT_SIZE } from "@/config/fontSize";

export default function UploadFileForm() {
    const uploadBtnText = "แปลงไฟล์";
    const selectBtnText = "เลือกไฟล์";
    const reSelectBtnText = "แปลงไฟล์ใหม่";
    const downloadBtnText = "ดาวน์โหลดไฟล์ทั้งหมด";
    const removeAllBtnText = "เอารายการออกทั้งหมด";

    const toast = useRef<Toast>(null);

    const [files, setFiles] = useState<filesModel[]>([]);
    const [uploadStatus, setUploadStatus] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles: File[] = Array.from(e.target.files);

            //PREVENT DUPLICATE FILES
            const existingFileNames = new Set(files.map(file => file.name));
            const uniqueNewFiles = selectedFiles.filter(file => !existingFileNames.has(file.name));

            if (uniqueNewFiles.length > 0) {
                const allFiles: filesModel[] = uniqueNewFiles.map((data) => ({
                    name: data.name,
                    size: data.size,
                    status: UPLOAD_STATUS.pedding,
                    data: data
                }));
                setFiles(prevFiles => [...prevFiles, ...allFiles]);
            }

            e.target.value = "";
        }
    };

    const removeFileItem = (index: number) => {
        const newData = [...files];
        newData.splice(index, 1);
        if (newData.length > 0) {
            setFiles(newData);
        } else {
            setUploadStatus(false);
            setFiles([]);
        }
    }

    const removeAllFileItem = () => {
        setUploadStatus(false);
        setFiles([]);
    }

    const handleUpload = async () => {
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("files", file.data);
            });

            try {
                const response = await axios.post("http://localhost:4000/FormatExcel", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data; charset=UTF-8',
                    },
                });

                if (response.data && response.data.data) {
                    toast.current?.show({ severity: 'success', summary: 'สำเร็จ', detail: 'แปลงไฟล์สำเร็จ' });

                    const result = response.data.data;
                    const allFiles: filesModel[] = [];
                    for (const data of result) {
                        const name: string = data[jsonFiles.name].toString();
                        const status: string = data[jsonFiles.status].toString();
                        const file: Blob = base64ToBlob(data[jsonFiles.file]);
                        allFiles.push({
                            name: name,
                            size: file.size,
                            status: status === FILE_STATUS.success ? UPLOAD_STATUS.success : UPLOAD_STATUS.fail,
                            data: file
                        });
                    }

                    setFiles(allFiles);
                    setUploadStatus(true);
                } else {
                    toast.current?.show({ severity: 'error', summary: 'ไม่สำเร็จ', detail: 'แปลงไฟล์ไม่สำเร็จ' });
                    setUploadStatus(false);
                }
            } catch (error) {
                toast.current?.show({ severity: 'error', summary: 'ไม่สำเร็จ', detail: `อัปโหลดไม่สำเร็จ \n ${error}` });
                setUploadStatus(false);
            }
        } else {
            toast.current?.show({ severity: 'warn', summary: 'คำเตือน', detail: 'กรุณาเลือกไฟล์ที่จะอัปโหลดก่อน' });
            setUploadStatus(false);
        }
    }

    const downloadAllFile = () => {
        files.forEach(data => {
            if (data.status === UPLOAD_STATUS.success) {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(data.data);
                link.download = data.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    const selectBt = <Button className={`p-2 gap-2 flex justify-center border-none bg-blue-600 focus:shadow-lg`} raised onClick={() => fileInputRef.current?.click()} onTouchStart={() => fileInputRef.current?.click()}>
        <i className="pi pi-file-import text-white" style={{ fontSize: FONT_SIZE.normal }}></i>
        <p className={`text-base text-white`}>{selectBtnText}</p>
    </Button>
    const uploadBt = <Button className={`p-2 gap-2 flex justify-center border-none bg-blue-400 focus:shadow-lg`} raised onClick={() => handleUpload()} onTouchStart={() => handleUpload()}>
        <i className="pi pi-file-edit text-white" style={{ fontSize: FONT_SIZE.normal }}></i>
        <p className={`text-base text-white`}>{uploadBtnText}</p>
    </Button>
    const reSelectBt = <Button className={`p-2 gap-2 flex justify-center border-none bg-blue-400 focus:shadow-lg`} raised onClick={() => removeAllFileItem()} onTouchStart={() => removeAllFileItem()}>
        <i className="pi pi-file-edit text-white" style={{ fontSize: FONT_SIZE.normal }}></i>
        <p className={`text-base text-white`}>{reSelectBtnText}</p>
    </Button>
    const downloadBt = <Button className={`p-2 gap-2 flex justify-center border-none bg-blue-800 focus:shadow-lg`} raised onClick={() => downloadAllFile()} onTouchStart={() => downloadAllFile}>
        <i className="pi pi-upload text-white" style={{ fontSize: FONT_SIZE.normal }}></i>
        <p className={`text-base text-white`}>{downloadBtnText}</p>
    </Button>
    const removeAllBt = <Button className={`w-3/6 p-2 gap-2 flex justify-center border-none bg-red-500 focus:shadow-lg`} raised onClick={() => removeAllFileItem()} onTouchStart={() => removeAllFileItem()}>
        <i className="pi pi-times text-white" style={{ fontSize: FONT_SIZE.normal }}></i>
        <p className={`text-base text-white`}>{removeAllBtnText}</p>
    </Button>
    const displayToast = <Toast ref={toast} position="bottom-center" />

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--supermarket)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="border-2 border-gray-400 rounded-md">
                    <div className="w-full p-5 border-2 rounded-md">
                        {displayToast}
                        <div className="w-full pb-3 border-b-[3px] border-gray-300 gap-2 flex flex-row">
                            {uploadStatus ? reSelectBt : selectBt}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onFileChange}
                                multiple
                                accept=".xlsx, .xls"
                                style={{ display: 'none' }}
                            />
                            {uploadStatus ? downloadBt : uploadBt}
                        </div>
                        <div className="flex flex-col">
                            <div className="pt-5 flex justify-center items-center">
                                {
                                    files.length > 0 ? removeAllBt : null
                                }
                            </div>
                            {files.map((data, index) => {
                                return (
                                    <div key={index} className="pt-5">
                                        {
                                            <CardFiles
                                                key={index}
                                                index={index}
                                                name={data.name}
                                                size={data.size}
                                                status={data.status}
                                                data={data.status === UPLOAD_STATUS.success ? data.data : null}
                                                removeItem={removeFileItem}
                                            />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
            {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer> */}
        </div>
    );
}
"use client";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { CardFiles } from "@/components/card/cardFiles";
import { FILE_STATUS, UPLOAD_STATUS } from "@/config/uploadStatus";
import axios from "axios";
import { filesModel, jsonFiles } from "@/app/model/filesModel";
import { base64ToBlob } from "@/utils/convertType";
import { FONT_SIZE } from "@/config/fontSize";
import { FileUpload } from "@/components/FileUpload";
import { ProgressSpinner } from "primereact/progressspinner";
import CONFIG from "@/config/api";

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
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      addFiles(selectedFiles);
      e.target.value = "";
    }
  };

  const addFiles = (raw_files: File[]) => {
    if (raw_files.length > 0) {
      //PREVENT DUPLICATE FILES
      const existingFileNames = new Set(files.map((file) => file.name));
      const uniqueNewFiles = raw_files.filter(
        (file) => !existingFileNames.has(file.name)
      );

      if (uniqueNewFiles.length > 0) {
        const allFiles: filesModel[] = uniqueNewFiles.map((data) => ({
          name: data.name,
          size: data.size,
          status: UPLOAD_STATUS.pending,
          data: data,
        }));

        setFiles((prevFiles) => [...prevFiles, ...allFiles]);
      }
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
  };

  const removeAllFileItem = () => {
    setUploadStatus(false);
    setFiles([]);
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file.data);
      });
      setLoading(true);
      try {
        const response = await axios.post(
          `${CONFIG.API_BASE_URL}/FormatExcel`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data; charset=UTF-8",
            },
          }
        );

        localStorage.setItem("uploadedFiles", JSON.stringify(response));

        console.log("Upload Response: ", response.data);

        if (response.data && response.data.data) {
          setLoading(false);
          const result = response.data.data;
          const allFiles: filesModel[] = [];
          for (const data of result) {
            const name: string = data[jsonFiles.name].toString();
            const status: string = data[jsonFiles.status].toString();
            const file: Blob = base64ToBlob(data[jsonFiles.file]);
            allFiles.push({
              name: name,
              size: file.size,
              status:
                status === FILE_STATUS.success
                  ? UPLOAD_STATUS.success
                  : UPLOAD_STATUS.fail,
              data: file,
            });
          }

          setFiles(allFiles);
          setUploadStatus(true);
        } else {
          setLoading(false);
          toast.current?.show({
            severity: "error",
            summary: "ไม่สำเร็จ",
            detail: "แปลงไฟล์ไม่สำเร็จ",
          });
          setUploadStatus(false);
        }
      } catch (error) {
        setLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "ไม่สำเร็จ",
          detail: `อัปโหลดไม่สำเร็จ \n ${error}`,
        });
        setUploadStatus(false);
      }
    } else {
      toast.current?.show({
        severity: "warn",
        summary: "คำเตือน",
        detail: "กรุณาเลือกไฟล์ที่จะอัปโหลดก่อน",
      });
      setUploadStatus(false);
    }
  };

  const downloadAllFile = () => {
    files.forEach((data) => {
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

  const selectBt = (
    <Button
      className={`px-8 py-2 gap-3 flex justify-center items-center border-none bg-blue-600 focus:shadow-lg`}
      raised
      onClick={() => fileInputRef.current?.click()}
      onTouchStart={() => fileInputRef.current?.click()}
    >
      <i
        className="pi pi-file-import text-white"
        style={{ fontSize: "20px" }}
      ></i>
      <p className={`text-[${FONT_SIZE.big}] text-white pt-1`}>
        {selectBtnText}
      </p>
    </Button>
  );
  const uploadBt = (
    <Button
      className={`px-8 py-2 gap-3 flex justify-center border-none bg-blue-400 focus:shadow-lg`}
      raised
      onClick={() => handleUpload()}
      onTouchStart={() => handleUpload()}
      disabled={files.length == 0 ? true : false}
    >
      <i
        className="pi pi-file-edit text-white"
        style={{ fontSize: "20px" }}
      ></i>
      <p className={`text-[${FONT_SIZE.big}] text-white pt-1`}>
        {uploadBtnText}
      </p>
    </Button>
  );
  const reSelectBt = (
    <Button
      className={`px-8 py-2 gap-3 flex justify-center border-none bg-blue-400 focus:shadow-lg`}
      raised
      onClick={() => removeAllFileItem()}
      onTouchStart={() => removeAllFileItem()}
    >
      <i
        className="pi pi-file-edit text-white"
        style={{ fontSize: "20px" }}
      ></i>
      <p className={`text-base text-white pt-1`}>{reSelectBtnText}</p>
    </Button>
  );
  const downloadBt = (
    <Button
      className={`px-8 py-2 gap-3 flex justify-center border-none bg-blue-800 focus:shadow-lg`}
      raised
      onClick={() => downloadAllFile()}
      onTouchStart={() => downloadAllFile}
    >
      <i className="pi pi-upload text-white" style={{ fontSize: "20px" }}></i>
      <p className={`text-base text-white pt-1`}>{downloadBtnText}</p>
    </Button>
  );
  const removeAllBt = (
    <Button
      className={`w-3/6 p-2 gap-2 flex flex-row justify-center border-none bg-red-500 focus:shadow-lg`}
      raised
      onClick={() => removeAllFileItem()}
      onTouchStart={() => removeAllFileItem()}
    >
      <i className="pi pi-times text-white" style={{ fontSize: "20px" }}></i>
      <p className={`text-base text-white pt-1`}>{removeAllBtnText}</p>
    </Button>
  );
  const displayToast = <Toast ref={toast} position="bottom-center" />;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16  font-[family-name:var(--supermarket)]">
      <div className="flex flex-col gap-8 row-start-2 items-center w-[50%] h-auto sm:items-start shadow-[1px_3px_7px_1.5px_rgba(0,0,0,0.2)] rounded-md">
        <div className="w-full p-5">
          {displayToast}
          <div className="w-full pb-3 border-b-[2px] gap-2 flex flex-row">
            {uploadStatus ? reSelectBt : selectBt}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              multiple
              accept=".xlsx, .xls"
              style={{ display: "none" }}
            />
            {uploadStatus ? downloadBt : uploadBt}
          </div>
          <div className="pb-4 flex flex-col justify-center items-center">
            <div className="w-full pt-5 flex flex-row justify-center">
              {files.length > 0 && !loading ? removeAllBt : null}
            </div>
            <div className="pt-5">{loading ? <ProgressSpinner /> : null}</div>
            {!uploadStatus && !loading ? (
              <div className="w-full max-w-4xl mx-auto min-h-70 border border-dashed bg-white dark:bg-black border-neutral-400 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={addFiles} fileSelect={files} />
              </div>
            ) : null}
            {files.length > 0 &&
              !loading &&
              files.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="w-full pt-5 flex flex-row justify-center items-center"
                  >
                    <CardFiles
                      key={index}
                      index={index}
                      name={data.name}
                      size={data.size}
                      status={data.status}
                      data={
                        data.status === UPLOAD_STATUS.success ? data.data : null
                      }
                      removeItem={removeFileItem}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
    // {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    // </footer> */}
  );
}

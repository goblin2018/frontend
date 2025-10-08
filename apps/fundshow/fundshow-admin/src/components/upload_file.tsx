import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Progress, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import getOss from "lib/useOss";
import React, { useMemo, useState } from "react";
import SparkMD5 from "spark-md5";
import { useAudioStore } from "store/audio";
import Tag from "./tag";
export const baseUrl = import.meta.env.VITE_OSS_URL;
export const oss = (url: string) => {
  return baseUrl + url;
};

type fileType = "image" | "file" | "audio";

interface UploadFileProps {
  className?: string;
  prefix?: string;
  value?: string;
  onChange?: (url: string) => void;
  desc?: string;
  type?: fileType;
  fileCB?: (file: RcFile) => void;
}

const UploadFile = React.forwardRef<any, UploadFileProps>(
  (
    {
      className,
      prefix = "productImg",
      value: url,
      onChange,
      desc = "添加图片",
      type = "image",
      fileCB,
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0);

    const [loading, setLoading] = useState(false);

    // 分片上传
    const upload = async ({ file, onProgress, onSuccess }: any) => {
      let md5 = await calculateMD5(file);
      setProgress(0);
      setLoading(true);
      let oss = await getOss();

      console.log("oss", oss);
      oss
        .multipartUpload(prefix + "/" + md5, file, {
          parallel: 4,
          partSize: 1024 * 1024,
          progress: function (p, cpt, res) {
            onProgress({ percent: p });
            setProgress(p);
          },
        })
        .then((res) => {
          onSuccess(res);
          setLoading(false);
          onChange!(prefix + "/" + md5);
        });
    };

    // 计算文件md5
    function calculateMD5(file: File) {
      return new Promise((resolve, reject) => {
        const chunkSize = 1024 * 1024 * 4; // 4MB
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();

        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          spark.append(event.target!.result as ArrayBuffer); // Append array buffer
          currentChunk++;

          if (currentChunk < chunks) {
            loadNext();
          } else {
            const md5 = spark.end();
            resolve(md5);
          }
        };

        function loadNext() {
          const start = currentChunk * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        loadNext();
      });
    }

    const setLen = useAudioStore((s) => s.setLen);

    // 上传之前的检查
    const beforeUpload = async (file: RcFile) => {
      onChange!("");
      if (fileCB) fileCB(file);
      return true;
    };

    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    // 文件变化时修改preview
    const handleChange: UploadProps["onChange"] = ({ fileList }) => {
      setFileList(fileList);
    };

    const getPreview = () => {
      switch (type) {
        case "audio":
        case "file":
          return <Tag color="green">文件正常</Tag>;
        default:
          return (
            <img
              src={baseUrl + url}
              alt="avatar"
              className="h-full w-full object-contain"
            />
          );
      }
    };
    const [showMask, setShowMask] = useState(false);

    const defaultStyle = useMemo(() => {
      switch (type) {
        case "file":
          return "h-16 w-[300px]";
        case "audio":
          return "h-10 w-[300px]";
        default:
          return "w-40 h-40";
      }
    }, [type]);

    return (
      <Upload
        className={`${className} ${defaultStyle} block`}
        maxCount={1}
        // listType="picture-card"
        ref={ref}
        fileList={fileList}
        customRequest={upload}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={false}
      >
        {/* 内部其实是使用的image 其实应该更换成 image 和 文件可切换的状态 */}
        {url ? (
          <div
            className="relative w-full h-full"
            onMouseEnter={() => {
              setShowMask(true);
            }}
            onMouseLeave={() => {
              setShowMask(false);
            }}
          >
            <div
              className={`absolute w-full h-full left-0 top-0  bg-black/30  z-10
               ${showMask ? "" : "hidden"}
               flex items-center justify-center
               `}
            >
              <EditOutlined className="text-white text-[22px] mr-4" />
              <DeleteOutlined
                className="text-white text-[22px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange!("");
                }}
              />
            </div>
            <div className="w-full h-full">{getPreview()}</div>
          </div>
        ) : (
          <div className="w-full h-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center p-4">
                <Progress percent={Math.round(progress * 100)} />
              </div>
            ) : (
              <div
                className={`w-full h-full flex ${type == "image" ? "flex-col space-y-2" : "space-x-2"} items-center justify-center p-1`}
              >
                <div className="">{desc}</div>
                <PlusOutlined className="text-base" />
              </div>
            )}
          </div>
        )}
      </Upload>
    );
  }
);

export default UploadFile;

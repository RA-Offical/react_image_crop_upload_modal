import React, {useCallback} from "react";
import {FaPencil} from "react-icons/fa6";


import {useDropzone} from "react-dropzone";
import {setFileToUrl} from "@/lib/utils.ts";

type FileUploaderProps = {
    setFile: React.Dispatch<React.SetStateAction<File[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFileUrl: React.Dispatch<React.SetStateAction<string>>;
    fileUrl: string;
}

function FileUploader(props: FileUploaderProps) {

    const {setFile, setOpen, setFileUrl, fileUrl} = props;

    // getting required props from useDropzone hook
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles);
        setFile(acceptedFiles);
        setFileUrl(setFileToUrl(acceptedFiles[0]))
        setOpen(true);
    }, [])


    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return <div className="flex flex-col items-center gap-20">

        <div {...getRootProps()} className="w-40 h-40 rounded-full border border-red-500 cursor-pointer">
            <input {...getInputProps()} />

            <div className={"w-full h-full relative group/update-profile hover:brightness-75 transition-all"}>
                <FaPencil
                    className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/update-profile:opacity-100 transition-all"}/>
                <img src={fileUrl || "/assets/1.jpg"} alt={""} className={"w-full h-full object-contain rounded-full"}/>
            </div>

        </div>
    </div>
}


export default FileUploader;
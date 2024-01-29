import {useState} from "react";
import FileUploader from "@/components/FileUploader.tsx";
import UploadCropper from "@/components/UploadCropper.tsx";

function ImageUpdater() {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState("");
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({width: 0, height: 0, x: 0, y: 0});
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState("")


    return (
        <div>
            {
                open ? <UploadCropper {...{
                    open, setOpen,
                    crop,
                    setCrop,
                    zoom,
                    setZoom,
                    croppedImage,
                    setCroppedImage,
                    croppedAreaPixels,
                    setCroppedAreaPixels, fileUrl, setFileUrl
                }}/> : <FileUploader {...{file, setFile, fileUrl, setFileUrl, setOpen}}/>
            }
        </div>
    )
}


export default ImageUpdater;
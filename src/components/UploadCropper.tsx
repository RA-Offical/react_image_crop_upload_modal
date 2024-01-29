import React from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/utils.ts";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

type UploadCropperProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    crop: { x: number, y: number };
    setCrop: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>,
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>,
    croppedAreaPixels: {
        width: number, height: number, x: number, y: number
    };
    setCroppedAreaPixels: React.Dispatch<React.SetStateAction<{
        width: number, height: number, x: number, y: number
    }>>,
    fileUrl: string;
    setFileUrl: React.Dispatch<React.SetStateAction<string>>
}

function UploadCropper(props: UploadCropperProps) {

    const {
        open, setOpen,
        crop,
        setCrop,
        zoom,
        setZoom,
        croppedAreaPixels,
        setCroppedAreaPixels, fileUrl, setFileUrl
    } = props;


    function onCropComplete(
        cropArea: { width: number; height: number; x: number; y: number },
        cropAreaPixels: { width: number; height: number; x: number; y: number }
    ) {
        console.log("Crop Area\n", cropArea);
        console.log("Crop Area Pixels\n", cropAreaPixels);
        setCroppedAreaPixels(cropAreaPixels);
    }

    async function showCroppedImage() {
        try {
            const croppedImage: string | null = await getCroppedImg(fileUrl, croppedAreaPixels);
            setFileUrl(croppedImage)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={"overflow-auto"}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={"overflow-auto max-h-screen"}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>

                    {/*Adding Cropper*/}
                    <Cropper
                        aspect={1}
                        onCropChange={setCrop}
                        crop={crop}
                        zoom={zoom}
                        onZoomChange={setZoom}
                        image={fileUrl}
                        cropShape="round"
                        onCropComplete={onCropComplete}
                        classes={{containerClassName: "!relative max-w-sm mx-auto w-full aspect-square"}}
                    />


                    <DialogFooter>
                        <Button type="submit" onClick={() => {
                            showCroppedImage();
                            setOpen(false);
                        }}>Update Profile</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    );
}

export default UploadCropper;

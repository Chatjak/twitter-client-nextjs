'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react'


export default function Upload({ token, closeUpload }: { token: string; closeUpload: any; }) {

    const filePickerRef = useRef<any>(null)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const addImageToState = (event: React.ChangeEvent) => {
        const reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result);
        };
    }

    const onSubmitCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            const result = await CreatePost(selectedFile, token)
            if (result === 200) {
 
                closeUpload()
            }
        }
    }
    return <>
        <div className='absolute w-full h-screen bg-gray-500 z-10 opacity-50'></div>
        <form onSubmit={onSubmitCreate} className="absolute w-[320px] h-[400px] bg-white z-20 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md">
            <div className='w-full rounded-t-md h-[350px] border-b-2 flex justify-center items-center' onClick={() => filePickerRef.current.click()}>
                {selectedFile ? <Image onClick={() => setSelectedFile(null)} src={selectedFile} alt='' width={320} height={350} className='w-full h-full object-cover rounded-t-md' /> : <p>Click for Upload</p>}
            </div>
            <input type="file" hidden accept='image/*' ref={filePickerRef} onChange={addImageToState} />
            <button type='submit' className='flex justify-center items-center w-full h-[50px] font-bold text-sky-400'>Upload</button>
        </form>
    </>


}


const CreatePost = async (selectedFile: any, token: string) => {
    try {
        const formData = new FormData()
        const dataUrlParts = selectedFile.split(",");
        const mimeType = dataUrlParts[0].split(":")[1].split(";")[0];
        const imageData = atob(dataUrlParts[1]);
        const buffer = new Uint8Array(imageData.length);

        for (let i = 0; i < imageData.length; i++) {
            buffer[i] = imageData.charCodeAt(i);
        }

        const imageBlob = new Blob([buffer], { type: mimeType });
        formData.append("userProfile", imageBlob);
        const response = await fetch(`http://localhost:8080/api/user/me/userProfile`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
        if (!response.ok) {
            throw new Error()
        }
        return 200
    } catch (error) { throw new Error() }
}
"use client"
import img from "@/assets/cloud-upload.jpg"
import React, { ChangeEvent, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Image from 'next/image'
import { $api } from '@/api/interceptors'
import { postAuthor, updateAuthor } from '@/api-service/authors-service'
import { IAuthor } from '@/types/user.types'

export default function AddAuthorModal({ open, toggle, editAuthor }: { open: boolean, toggle: () => void; editAuthor: IAuthor ; }) {
    const [file, setFile] = useState("")
    const [fullname, setFullname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [country, setCountry] = useState("");

    const imgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files && e.target.files[0]
        const form = new FormData()
        form.append("file", file as Blob)
        const response = await $api.post("/files/upload", form)
        setFile(response?.data)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: IAuthor = {
            full_name: fullname ? fullname : editAuthor?.full_name,
            birthdate: birthdate ? birthdate : editAuthor?.birthdate,
            country: country ? country : editAuthor?.country,
            image: file ? file : editAuthor?.image
        }
        if(editAuthor?.full_name !== "") {
            await updateAuthor({...payload, id: editAuthor?.id})
        } else {
            await postAuthor(payload);
        }
        toggle();
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    

    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>
                    <h3>Add Author</h3>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit} className="flex flex-wrap justify-end">
                        <div className="w-[40%] relative">
                            <input type="file" className="absolute w-[100%] h-[100%] opacity-0 z-20 cursor-crosshair" onChange={imgUpload} />
                            <Image className="w-[100%] absolute top-0 h-[100%] object-contain p-[10px]" src={img} alt='img' fill />
                        </div>
                        <div className="w-[60%]">
                            <input type="text"  placeholder="Fullname" defaultValue={editAuthor?.full_name} className="form-control my-2"  onChange={(e) => setFullname(e.target.value)} />
                            <input type="date"  placeholder="Birthdate" defaultValue={editAuthor?.birthdate} className="form-control my-2"  onChange={(e) => setBirthdate(e.target.value)} />
                            <input type="text"  placeholder="Country"  defaultValue={editAuthor?.country}  className="form-control my-2"  onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <button type="submit" className=" px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]">
                            Save
                        </button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

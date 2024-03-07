"use client"
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import img from "../../../../assets/up.webp"
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image';
import { createUser, UpdateUser } from '@/api-service/users-service';
import { IUser } from '@/types/user.types';
import { $api } from '@/api/interceptors';

export default function AddUserModal({ open, toggle, userId}: { open: boolean; toggle: () => void; userId: IUser;  }) {
    const [file, setFile] = useState()
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files && e.target.files[0]
        const form = new FormData()
        form.append("file", file as Blob)
        const respons = await $api.post("/upload", form)
        setFile(respons?.data?.path)
        console.log(respons, "rsvsvrssr")
    }
    const [update, setUpdate] = useState("")

    const handleSubmit = async (formData: FormData) => {
        let first_name = formData.get("first_name") as string
        let last_name = formData.get("last_name") as string
        let age = Number(formData.get("age")) as number
        let role = formData.get("role") as string
        let username = formData.get("username") as string
        let password = formData.get("password") as string
        let description = formData.get("description") as string

        let payload: IUser = {
            first_name,
            last_name,
            age,
            role,
            username,
            password,
            description,
            avatar: `${file}`
        }

        if (userId?.first_name !== "") {
            // const respons = await UpdateUser({ ...payload, _id: userId?._id })
            const respons = await UpdateUser({...payload, _id: userId?._id})
        } else {
            const respons = await createUser({ ...payload })
            if (respons?.status === 200) {
                window.location.reload();
            } else {
                console.log("error");
            }
        }
    }

    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>
                    <h3>Enter your username</h3>
                </ModalHeader>
                <ModalBody>
                    <form action={handleSubmit} className='flex items-center gap-[5px]'>
                        <div className='w-[40%] h-[150px] border relative cursor-pointer'>
                            <input type="file" onChange={handleFileChange} className="w-[100%] cursor-crosshair h-[100%] z-10 absolute opacity-0" />
                            <Image src={img} alt='user' className="w-[100%] border-none object-cover h-[100%] absolute z-0 mix-blend-multiply" />
                            {/* <Image src={ file ? `http://localhost:8080/${file}` :  `http://localhost:8080/${userId?.avatar}`  } alt='user' fill className="w-[100%]  object-cover h-[100%] absolute z-0 mix-blend-multiply" /> */}
                        </div>
                        <div className='w-[60%]'>
                            <input type="text" placeholder='first name' name='first_name' defaultValue={userId?.first_name} className=' w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' />
                            <input type="text" placeholder='last_name' name='last_name' defaultValue={userId?.last_name} className=' w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' />
                            <input type="number" placeholder='age' name='age' defaultValue={userId?.age} className=' w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' />
                            <select name="role" id="" defaultValue={userId?.role} className='w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' >
                                <option value="" hidden>Role</option>
                                <option value="employee" >Employee</option>
                            </select>
                            <input type="text" placeholder='username' defaultValue={userId?.username} name='username' className=' w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' />
                            <input type="password" placeholder='password' name='password' defaultValue={userId?.password} className=' w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' />
                            <textarea name="description" id="" cols={30} rows={5} defaultValue={userId?.description} placeholder='Description' className='w-[100%] py-[8px] px-[10px] border-[1px] my-[5px] rounded-[5px]' ></textarea>
                            <button className='w-[100px] border-[2px] h-[40px] rounded ml-[180px]'>save</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}



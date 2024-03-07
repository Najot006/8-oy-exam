import { deleteUser } from '@/api-service/users-service';
import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import img from "@/assets/deleteImg.gif"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Image from 'next/image';
export default function DeleteUserModal({ open, toggle, id }: { open: boolean; toggle: () => void; id: string | undefined; }) {

    const removeUser = async () => {
        const respons = await deleteUser(id);
        if (respons?.status === 200) {
            window.location.reload();
        } else {
            console.log("error");
        }
    }

    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>
                    <h4>Do you want to delete users?</h4>
                </ModalHeader>
                <ModalBody className='flex items-center justify-center'>
                    <Image src={img} alt='img' className='w-[350px] h-[300px]' />
                </ModalBody>
                <ModalFooter>
                <Stack direction="row" spacing={2}>
                        <Button  onClick={removeUser} variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                        </Button>
                        </Stack>
                <Stack direction="row" spacing={2}>
                        <Button  onClick={toggle} variant="outlined" startIcon={<DoneIcon />}>
                        No Delete
                        </Button>
                        </Stack>
                </ModalFooter>
            </Modal>
        </div>
    )
}




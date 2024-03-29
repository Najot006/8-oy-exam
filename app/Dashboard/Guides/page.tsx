"use client";
import React, { useEffect, useState } from "react";
import GuidesModal from "@/app/Modals/GenreModal/page";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { IGuides } from "@/types/guides.types";
import { deleteGuides, getGuides } from "@/api-service/guides.service";
const EditObj = {
  title: "",
  content: ""
}
const Guides = () => {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState([]);
  const [editGuides, setEditGuides] = useState<IGuides>(EditObj);

  const GetGuides = async () => {
    const response = await getGuides();
    setGuides(response?.data?.data);
  };

  useEffect(() => {
    GetGuides();
  }, []);

  const deletModal = (id: number) => {
    deleteGuides(id);
  };
  const editModal = (item: IGuides) => {
    setEditGuides(item);
    setOpen(true);
  };

  return (
    <div>
      <div className="sticky z-30 top-0"></div>
      <div className="flex">
        <GuidesModal
          open={open}
          setOpen={setOpen}
          editGuides={editGuides}
          setEditGuides={setEditGuides}
        />
        <div>
          <Button
            variant="contained"
            className="ml-[5%] mt-[2%] bg-slate-800"
            onClick={() => setOpen(true)}
          >
            open MODAL
          </Button>
          <div className="w-[100%] flex flex-wrap justify-center p-[10px] gap-[20px]">
            {guides.map((item: any, index) => {
              return (
                <div
                  key={index}
                  className="w-[300px] p-[15px] rounded-xl border flex flex-col gap-[20px] bg-white"
                >
                  <div className="flex">
                    <Stack direction="row" spacing={2} className="ml-[4px]">
                      <Button
                        onClick={() => deletModal(item._id)}
                        variant="outlined"
                        className="bg-red-700 rounded text-[white]"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} className="ml-[60px]">
                      <Button
                        onClick={() => editModal(item)}
                        variant="outlined"
                        className=" bg-green-700 rounded text-[white]"
                        startIcon={<EditNoteIcon />}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </div>
                  <h1 className="text-[25px] text-center">Rule</h1>
                  <h4>{item.title}</h4>
                  <h4>{item.content}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;

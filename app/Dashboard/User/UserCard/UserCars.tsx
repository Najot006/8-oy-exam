"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateIcon from "@mui/icons-material/Create";
import { IUser } from "@/types/user.types";
import DeleteUserModal from "@/app/Modals/UserModal/DeleteUserModal/page";

interface IUserCardProps {
  item: IUser;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  userId: string | IUser;
  setUserId: Dispatch<SetStateAction<IUser>>;
}

const UserCard: React.FC<IUserCardProps> = ({
  item,
  setModalEdit,
  userId,
  setUserId,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [userModal, setUserModal] = useState(false);
  const [itemIdd, setItemId] = useState<string | undefined>("");
  const [active, setActive] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteUser = (itemId: string | undefined) => {
    setUserModal(true);
    setItemId(itemId);
  };

  const editUser = (item: any) => {
    setModalEdit(true);
    setUserId(item);
  };

  const toggle = () => {
    setUserModal(false);
    setItemId("");
  };
  const popUp = () => {
    setActive(!active);
  };

  return (
    <div>
      <DeleteUserModal open={userModal} toggle={toggle} id={itemIdd} />
      <Card sx={{ maxWidth: 300 }} className=" relative">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={popUp}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${item?.role}`}
          subheader={`${item?.username}`}
        />

        <div
          className={`${
            active ? " " : " hidden"
          } absolute border-[1px] top-1px right-0 bg-white w-[90px] `}
        >
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => deleteUser(item?._id)}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} className="mt-[10px]">
            <Button
              onClick={() => editUser(item)}
              variant="outlined"
              startIcon={<CreateIcon />}
            >
              Edit
            </Button>
          </Stack>
        </div>
      
        <CardMedia
          component="img"
          height="194"
          image={`http://localhost:8080/${item?.avatar}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex justify-between">
          <h6>{item?.age} years old</h6>

          <h6>{item?.first_name}</h6>
        </CardActions>
      </Card>
    </div>
  );
};

export default UserCard;

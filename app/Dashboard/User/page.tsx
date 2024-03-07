"use client"
import React, { useEffect, useState } from 'react';
import AddUserModal from '@/app/Modals/UserModal/AddUserModal/page';
import { getUser } from '@/api-service/users-service';
import { IUser } from '@/types/user.types';
import UserCard from './UserCard/UserCars';

const UserArr ={
  first_name: "",
  last_name: "",
  username:"",
  password:"",
  age:"",
  description:"",
  avatar:"",
  _id:"",
  role:"",
  image:""
};

export default function User() {
  const [userModal, setUserModal] = useState(false);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [userId, setUserId] = useState<IUser>(UserArr);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser();
        setUserData(data?.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchData();
  }, []);

  const ModalUser = () => {
    setUserModal(true);
  };

  const toggle = () => {
    setUserModal(false);
  };

  const filteredUserData = userData.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='px-[50px] py-[20px]'>
      <AddUserModal open={userModal} toggle={toggle} userId={userId} />
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='mb-4 py-1 px-2 border border-gray-400 rounded'
      />
      <button onClick={ModalUser} className='text-[#fff] bg-blue-700 py-[8px] px-[15px] rounded-[5px] ml-[100px]'>Add User</button>
      <div className='flex flex-wrap justify-between gap-[20px] mt-[20px]'>
        {filteredUserData.map((item, index) => (
          <div key={index}>
            <UserCard item={item} userId={userId} setUserId={setUserId} setModalEdit={setUserModal}/>
          </div>
        ))}
      </div>
    </div>
  );
}

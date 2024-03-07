"use client"
import { postAuth } from '@/api-service/auth-server'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
interface formData {
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

const Auth = () => {
  const router = useRouter()
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username")
    const password = formData.get("password")
    const payload: formData = { username, password }
    
    const response = await postAuth({ ...payload })
    if (response?.data?.token) {
      if (response?.data?.role === "employee") {
        redirect("/Dashboard/UserEasy")
      } else if (response?.data?.role === "admin") {
        redirect("/Dashboard/User")
      }
    }
  }
  return (
    <div className=" flex flex-col mt-[150px] items-center">
      <h1 className="text-[30px] my-4 font-black">SignUp</h1>
      <form
        action={handleSubmit}
        className="w-[500px] p-[20px] border-[1px]  border-black rounded-lg bg-gray-200"
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          className="w-full p-3 mt-[20px] border-[1px] border-gray-950 rounded-md bg-gray-100"
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          className="w-full p-3 mt-[30px] border-[1px] border-gray-950 rounded-md bg-gray-100 text-[black]"
        />
        <button className="w-[100px] p-3 rounded-lg border-[2px] mt-[20px] ml-[180px] bg-green-700 text-[white] font-bold">Login</button>
      </form>
    </div>
  )
}

export default Auth
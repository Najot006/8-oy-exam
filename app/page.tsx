import Link from 'next/link'
import React from 'react'
import TouchAppIcon from '@mui/icons-material/TouchApp';
export default function page() {
  return (
    <div>
      <h1 className='mt-[200px] ml-[580px] text-[20px]'>Click the link to go to the auth section <TouchAppIcon/></h1>
      <p className='ml-[732px] mt-[10px] '>👇🏻</p>
      <Link href="/auth" className='ml-[700px] text-[40px]'>Auth</Link>
    </div>
  )
}

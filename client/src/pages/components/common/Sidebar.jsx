import React from 'react'
import { Link } from 'react-router-dom'
import { MdHomeFilled } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineExitToApp } from "react-icons/md";
export default function Sidebar() {
    const userData = {
        fullName: "John Doe",
        username: 'John',
        avatar: '/avatars/boy1.png',
    }
    return (
        <div className='h-screen sticky top-0 left-0'>
            <div className='flex flex-col gap-5 mt-[10rem] ml-[1rem] mr-[1rem] lg:ml-[2rem] lg:mr-[2rem] xl:ml-[5rem] xl:mr-[5rem]'>
                <Link to="/">
                    <div className='flex justify-left items-center gap-4 px-2 py-2 lg:px-4 lg:py-2 rounded-lg text-center text-xl hover:bg-neutral hover:text-white'>
                        <MdHomeFilled className='w-7 h-7' />
                        <div className='hidden lg:block'>Home</div>
                    </div>
                </Link>
                <Link to="/notifications">
                    <div className='flex justify-left items-center gap-4 px-2 py-2 lg:px-4 lg:py-2 rounded-lg text-center text-xl hover:bg-neutral hover:text-white'>
                        <MdNotifications className='w-7 h-7' />
                        <div className='hidden lg:block'>Notification</div>
                    </div>
                </Link>
                <Link to={`/profile/${userData?.username}`}>
                    <div className='flex justify-left items-center gap-4 px-2 py-2 lg:px-4 lg:py-2 rounded-lg text-center text-xl hover:bg-neutral hover:text-white ml-1'>
                        <FaRegUser className='w-6 h-6' />
                        <div className='hidden lg:block'>Profile</div>
                    </div>
                </Link>
            </div>

            <div className='absolute bottom-3 mr-auto ml-auto left-0 right-0 w-[80%]'>
                <div className='flex justify-center lg:justify-around item-center h-full border-none p-0 lg:p-2 rounded-lg lg:flex-row flex-col'>
                    <div className='flex gap-2'>
                        <div className='rounded-full w-12'>
                            <img src={userData.avatar} alt="" />
                        </div>
                        <div>
                            <p className='font-medium hidden lg:block'>{userData.fullName}</p>
                            <p className='hidden lg:block'>@{userData.username}</p>
                        </div>
                    </div>
                    <div className='cursor-pointer ml-2 lg:ml-0'>
                        <MdOutlineExitToApp className='w-6 h-6 mt-3' />
                    </div>
                </div>
            </div>
        </div>
    )
}

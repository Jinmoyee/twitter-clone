import React from 'react'
import { Link } from 'react-router-dom'
import { MdHomeFilled } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineExitToApp } from "react-icons/md";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function Sidebar() {
    const queryClient = useQueryClient()

    const { mutate: loggedOut, isError, isPending, error } = useMutation({
        mutationFn: async () => {
            try {
                // Simulate a server request
                const res = await fetch("/api/auth/logout", {
                    method: 'POST',
                })
                const data = await res.json()
                toast.success('Logged out successfully')
            } catch (error) {
                console.log(error)
                toast.error('Failed to log out')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
        }
    })

    const { data: userData } = useQuery({ queryKey: ['authUser'] })
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

            <div className='absolute bottom-3 mr-auto ml-auto left-0 right-0 w-[70%] hover:bg-neutral hover:text-white border-2 border-neutral rounded-lg'>
                <div className='flex justify-center lg:justify-around item-center h-full border-none p-0 lg:p-2 rounded-lg lg:flex-row flex-col'>
                    <Link to={`/profile/${userData?.username}`}>
                        <div className='flex gap-2'>
                            <div className='w-12'>
                                <img src={userData.profileImg || "/avatar-placeholder.png"} alt="" className='rounded-full' />
                            </div>
                            <div>
                                <p className='font-medium hidden lg:block'>{userData.fullName}</p>
                                <p className='hidden lg:block'>@{userData.username}</p>
                            </div>
                        </div>
                    </Link>
                    <div
                        className='cursor-pointer ml-2 lg:ml-0'
                        onClick={
                            (e) => {
                                e.preventDefault()
                                loggedOut()
                            }
                        }
                    >
                        <MdOutlineExitToApp className='w-6 h-6 mt-3' />
                    </div>
                </div>
            </div>
        </div>
    )
}

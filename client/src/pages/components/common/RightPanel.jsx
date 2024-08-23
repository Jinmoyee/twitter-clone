import { useState } from 'react'
import { USERS_FOR_RIGHT_PANEL } from '../../../utils/db/dummey'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
export default function RightPanel() {
    const { data: suggestedUsers, isLoading, isPending } = useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            // Fetch data from API
            try {
                const response = await fetch('/api/users/suggested')
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch suggested users')
                }
                return data
            } catch (err) {
                throw new Error(err.message)
            }
        },
    })

    if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0'></div>;

    return (
        <div className='hidden lg:block my-4 mx-2'>
            <div className='p-4 rounded-md sticky top-2 border-[0.15rem] border-neutral'>
                <p className='font-bold mb-1 text-lg'>Who to follow</p>
                <div className='flex flex-col gap-4'>
                    {/* item */}
                    {isLoading && (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    )}
                    {!isLoading &&
                        suggestedUsers?.map((user) => (
                            <Link
                                to={`/profile/${user.username}`}
                                className='flex items-center justify-between gap-4'
                                key={user._id}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-10 rounded-full'>
                                            <img src={user.profileImg || "/avatar-placeholder.png"} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold tracking-tight truncate w-28'>
                                            {user.fullName}
                                        </span>
                                        <span className='text-sm text-slate-500'>@{user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='btn text-neutral border border-neutral hover:bg-amber-950 hover:text-white hover:opacity-90 rounded-full btn-sm'
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Follow
                                    </button>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}

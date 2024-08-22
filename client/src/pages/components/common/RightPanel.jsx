import { useState } from 'react'
import { USERS_FOR_RIGHT_PANEL } from '../../../utils/db/dummey'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
export default function RightPanel() {
    const [loading, setloading] = useState(false)
    const [availabeUsers, setAvailabelUsers] = useState({

    })
    return (
        <div className='w-[18rem]' >
            <div className='border-[0.15rem] border-neutral rounded-lg m-3 flex flex-col items-center justify-around p-2 sticky top-3'>
                <h4 className='text-lg font-bold'>Who to follow</h4>
                {loading && (
                    <><RightPanelSkeleton /><RightPanelSkeleton /><RightPanelSkeleton /><RightPanelSkeleton /></>
                )}
                {!loading && USERS_FOR_RIGHT_PANEL.map((user) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className='flex gap-4 items-center p-3'>
                        <div className='w-10 rounded-full'>
                            <img src={user.profileImg || "/avatar-placeholder.png"} />
                        </div>
                        <div>
                            <p className='font-semibold'>{user.fullName}</p>
                            <p>@{user.username}</p>
                        </div>
                        <div>
                            <button className='border-2 rounded-full border-neutral px-4 py-2 text-neutral hover:text-white hover:bg-neutral'>Follow</button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

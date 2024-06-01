import React from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { CiInboxIn } from "react-icons/ci";
import { MdDrafts } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaTrash } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { logout } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



function SideBar() {
    const dispatch = useDispatch();

  return (
    <div className='bg-gray-700 text-white w-[10vw] lg:w-[20vw] h-[100vh] flex flex-col items-center justify-between py-[6vh]'>
        <div className='flex flex-col gap-4 cursor-pointer lg:w-[full] w-[60%]'>
            <NavLink to='/compose' className={`flex items-center justify-center gap-2 bg-gray-400 px-4 py-1 rounded-full text-yellow-300`}>
                <i><MdModeEditOutline /></i>
                Compose
            </NavLink>
            <NavLink  className='flex items-center justify-center gap-4 text-xl' >
                <i className='w-[10%]'><CiInboxIn /></i>
                <p className='w-[40%]'>Inbox</p>
            </NavLink>
            <NavLink className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><MdDrafts /></i>
                <p className='w-[40%]'>Draft</p>
            </NavLink>
            <NavLink className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><MdOutlineStarRate /></i>
                <p className='w-[40%]'>Starred</p>
            </NavLink>
            <NavLink className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><LiaTelegramPlane /></i>
                <p className='w-[40%]'>Sent</p>
            </NavLink>
            <NavLink className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><FaTrash /></i>
                <p className='w-[40%]'>Trash</p>
            </NavLink>
        </div>
        <div className='flex flex-col gap-4 cursor-pointer'>
            <div className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><FaUserAlt /></i>
                <p className='w-[80%]'>Your Profile</p>
            </div>
            <div className='flex items-center justify-center gap-4 text-xl'>
                <i className='w-[10%]'><IoMdLogOut /></i>
                <p className='w-[80%]' onClick={()=>dispatch(logout())}>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default SideBar;
import React from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-700 text-white w-20 md:w-64 h-full flex flex-col items-center justify-between py-6 fixed top-0 left-0">
      <div className="flex flex-col gap-4 cursor-pointer w-full px-2 md:px-4">
        <NavLink
          to='/compose'
          className='flex items-center gap-2 bg-gray-400 px-4 py-2 rounded-full text-yellow-300 justify-center md:justify-start'
        >
          <MdModeEditOutline className='text-2xl' />
          <span className='hidden md:inline'>Compose</span>
        </NavLink>
        <NavLink
          to='/inbox'
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
        >
          <CiInboxIn className='text-2xl' />
          <span className='hidden md:inline'>Inbox</span>
        </NavLink>
        <NavLink
          to='/drafts'
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
        >
          <MdDrafts className='text-2xl' />
          <span className='hidden md:inline'>Draft</span>
        </NavLink>
        <NavLink
          to='/starred'
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
        >
          <MdOutlineStarRate className='text-2xl' />
          <span className='hidden md:inline'>Starred</span>
        </NavLink>
        <NavLink
          to='/sent'
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
        >
          <LiaTelegramPlane className='text-2xl' />
          <span className='hidden md:inline'>Sent</span>
        </NavLink>
        <NavLink
          to='/trash'
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
        >
          <FaTrash className='text-2xl' />
          <span className='hidden md:inline'>Trash</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 cursor-pointer w-full px-2 md:px-4">
        <div className='flex items-center gap-4 text-xl justify-center md:justify-start'>
          <FaUserAlt className='text-2xl' />
          <span className='hidden md:inline'>Your Profile</span>
        </div>
        <div
          className='flex items-center gap-4 text-xl justify-center md:justify-start'
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          <IoMdLogOut className='text-2xl' />
          <span className='hidden md:inline'>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

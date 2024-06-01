import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SignUp from "./pages/SignUp";
import SideBar from "./pages/SideBar";
import { Outlet } from 'react-router-dom';

function App() {
  const apiKey = import.meta.env.VITE_MAILBOX_APIKEY;
  const db = import.meta.env.VITE_MAILBOX_DATABASE;
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div>
      {!isLoggedIn && <SignUp />}

      {isLoggedIn && (
        <div className="flex">
          <SideBar setIsComposeOpen={setIsComposeOpen} />
          <div className={`flex-grow transition-all duration-300`}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

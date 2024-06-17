import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receivedEmail, markEmailAsRead } from '../features/emailSlice';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import useApi from '../hooks/useApi';

function Inbox() {
  const [loader, setLoader] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const currentUserEmail = localStorage.getItem('email');
  const userEmail = currentUserEmail.replace(/[@.]/g, '');
  const dbUrl = import.meta.env.VITE_MAILBOX_DATABASE;
  const dispatch = useDispatch();
  const data = useSelector(state => state.email.received);
  const { onSend, onDelete } = useApi();

  const getData = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${dbUrl}/${userEmail}/inbox.json`);
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      
      const data = await response.json();
      const readStatuses = JSON.parse(localStorage.getItem('readSendEmails')) || {};
      const loadedRes = [];
      for (const key in data) {
        loadedRes.push({
          id: key,
          ...data[key],
          read: readStatuses[key] || false,
        });
      }
      dispatch(receivedEmail([...loadedRes]));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEmail = (email) => {
    setSelectedEmail(email);
    const readStatuses = JSON.parse(localStorage.getItem('readSendEmails')) || {}
    readStatuses[email.id] = true;
    localStorage.setItem('readSendEmails', JSON.stringify(readStatuses));
    const updateEmails = data.map((e)=>e.id === email.id ? {...e, read:true} : e)
    dispatch(receivedEmail(updateEmails));
  };

  const handleDelete = async (email) => {
    // Disable the button during the delete request
    setLoader(true);

    // Move to trash
    try {
      const sendData = { to: email.senderEmail, sub: email.subject, body: email.body };
      await onSend(`${dbUrl}/${userEmail}/trash.json`, sendData);

      // Delete from Inbox
      await onDelete(`${dbUrl}/${userEmail}/inbox/${email.id}.json`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
      getData();
    }
  };

  return (
    <>
      <h2 className='text-center text-2xl font-bold italic'>Inbox</h2>
      <div className='flex justify-center mt-4'>
        <div className='w-1/2 bg-white rounded shadow-md p-4'>
          {loader && <p>Loading...</p>}

          {!loader && (
            <>
              {!selectedEmail && (
                <ul>
                  {data?.map((email) => (
                    <li
                      key={email.id}
                      className={`cursor-pointer border-b p-2 flex items-center justify-between ${email?.read ? '' : 'font-bold'}`}
                      onClick={() => handleEmail(email)}
                    >
                      <div className='flex items-center'>
                        {!email.read && (
                          <span className='mr-2 h-2 w-2 bg-blue-500 rounded-full inline-block'></span>
                        )}
                        <div>{email.senderEmail} | <span>{email.subject}</span></div>
                      </div>
                      <i onClick={() => handleDelete(email)} className='pr-2 text-red-700 cursor-pointer'><FaTrashAlt /></i>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {selectedEmail && (
            <div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="mb-4 text-blue-500"
              >
                Back to Inbox
              </button>
              <h3 className="text-xl font-bold">{selectedEmail.subject}</h3>
              <p className="text-gray-600">From: {selectedEmail.senderEmail}</p>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Inbox;

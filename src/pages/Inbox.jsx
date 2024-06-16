import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {receivedEmail, sendEmail, unreadEmail} from '../features/emailSlice'

function Inbox() {
  const [loader, setLoader] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const currentUserEmail = localStorage.getItem('email');
  const userEmail = currentUserEmail.replace(/[@.]/g, '');
  const dbUrl = import.meta.env.VITE_MAILBOX_DATABASE;
  const dispatch = useDispatch();
  const data = useSelector(state => state.email.received);
  const getData = async () =>{
    try {
      setLoader(true);
      const response = await fetch(`${dbUrl}/${userEmail}/inbox.json`);
      
      if(!response.ok){
        const err = await response.json();
        throw new Error(err.message)
      }
      
      const data = await response.json();
      const loadedRes = [];
      for (const key in data) {
        loadedRes.push({
          id: key,
          ...data[key],
        })
      }
      dispatch(receivedEmail([...loadedRes]))
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  const handleEmail = (email) =>{
    setSelectedEmail(email);
  }
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
                  {data?.map((email)=>(
                    <li onClick={()=>handleEmail(email)} key={email.id} className='cursor-pointer border-b p-2'>
                      <span className='font-bold'>{email.senderEmail}</span> | {email.subject}
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
  )
}

export default Inbox
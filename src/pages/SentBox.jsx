import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../features/emailSlice';
import toast from 'react-hot-toast';

function SentBox() {
  const [loader, setLoader] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const currentUserEmail = localStorage.getItem('email');
  const userEmail = currentUserEmail.replace(/[@.]/g, '');
  const dbUrl = import.meta.env.VITE_MAILBOX_DATABASE;
  const dispatch = useDispatch();
  const sentData = useSelector(state => state.email.send);

  const getSentData = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${dbUrl}/${userEmail}/sent.json`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      const data = await response.json();
      const readStatuses = JSON.parse(localStorage.getItem('readSentEmails')) || {};
      const loadedRes = [];
      for (let key in data) {
        loadedRes.push({
          id: key,
          ...data[key],
          read: readStatuses[key] || false,
        });
      }
      dispatch(sendEmail([...loadedRes]));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getSentData();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    const readStatuses = JSON.parse(localStorage.getItem('readSentEmails')) || {};
    readStatuses[email.id] = true;
    localStorage.setItem('readSentEmails', JSON.stringify(readStatuses));
    const updatedEmails = sentData.map(e => e.id === email.id ? { ...e, read: true } : e);
    dispatch(sendEmail(updatedEmails));
  };

  return (
    <>
      <h2 className='text-center text-2xl font-bold italic'>Sent Emails</h2>
      <div className='flex justify-center mt-4'>
        <div className='w-1/2 bg-white rounded shadow-md p-4'>
          {loader && <p>Loading...</p>}

          {!loader && (
            <>
              {!selectedEmail && (
                <ul>
                  {sentData?.map((email) => (
                    <li
                      key={email.id}
                      className={`cursor-pointer border-b p-2 flex items-center justify-between ${email?.read ? '' : 'font-bold'}`}
                      onClick={() => handleEmailClick(email)}
                    >
                      <div className='flex items-center'>
                        {!email.read && (
                          <span className='mr-2 h-2 w-2 bg-blue-500 rounded-full inline-block'></span>
                        )}
                        <div>{email.to} | <span>{email.subject}</span></div>
                      </div>
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
                Back to Sent Emails
              </button>
              <h3 className="text-xl font-bold">{selectedEmail.subject}</h3>
              <p className="text-gray-600">To: {selectedEmail.to}</p>
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

export default SentBox;

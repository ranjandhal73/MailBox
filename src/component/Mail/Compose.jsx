import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import useApi from "../../hooks/useApi";


function Compose() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const {onSend} = useApi();
  const dbUrl = import.meta.env.VITE_MAILBOX_DATABASE;

  const senderEmail = localStorage.getItem('email')
  const handleSend = async () => {
      /*-------------------------Post to SentBox----------------------*/
    const replacedSenderEmail = senderEmail?.replace(/[@.]/g, "");
    const sendData = {to, subject, body};

    if(sendData.to !== null){
        await onSend(`${dbUrl}/${replacedSenderEmail}/sent.json`,sendData);
    }

    /*------------------------Post to Inbox---------------------------*/
    const toEmail = to?.replace(/[@.]/g,'');
    const receivedData = {senderEmail,subject,body};

    if(receivedData.senderEmail !== null){
        await onSend(`${dbUrl}/${toEmail}/inbox.json`,receivedData);
    }

  };
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
        <input
          type="text"
          id="to"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
        <input
          type="text"
          id="subject"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body:</label>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="mt-1 p-2 h-80"
        />
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Compose;

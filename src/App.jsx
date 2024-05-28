import SignUp from "./pages/SignUp"


function App() {
  const apiKey = import.meta.env.VITE_MAILBOX_APIKEY;
  const db = import.meta.env.VITE_MAILBOX_DATABASE;

  return (
    <>
      <SignUp />
    </>
  )
}

export default App

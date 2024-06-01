import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Compose from './component/Mail/Compose.jsx'
import UserProfile from './pages/UserProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} > 
      <Route path='/compose' element={<Compose />} />
      <Route path='/user-profile' element={<UserProfile />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false}/>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)

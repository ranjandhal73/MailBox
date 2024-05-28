import React, {useRef, useState} from 'react'
import signupImage from '../assets/signup.jpg'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

function SignUp() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef(); 

    const dispatch = useDispatch();

    const apiKey = import.meta.env.VITE_MAILBOX_APIKEY;

    const formHandler = async (e) =>{
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current?.value;

        if (!isLoggedIn && password !== confirmPassword) {
            toast.error('Passwords does not match');
            return;
          }

        const url = isLoggedIn
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`

        try {
            const response = await fetch (`${url}`,{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            
            if(!response.ok){
                const err = await response.json();
                throw new Error (err.error.message)
            }

            const data = await response.json();
            if(isLoggedIn){
                toast.success('Login Successfully...')
            }else{
                toast.success('Accounts created successfully...')
            }
            dispatch(login(data.idToken))
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            if(confirmPasswordInputRef.current){
                confirmPasswordInputRef.current.value = '';
            }

            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const switchAuthHandler = () =>{
        setIsLoggedIn((prev) => !prev);
    }

  return (
    <div style={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    }} className='flex flex-col gap-4 items-center justify-center'>
        <form onSubmit={formHandler} className='flex flex-col gap-5 shadow-lg shadow-gray-100 px-6 py-10 w-[30vw]'>
            <label>
                <input
                    className='w-full px-2 py-1' 
                    type="email" 
                    placeholder="Email"
                    ref={emailInputRef}
                    required
                />
            </label>
            <label>
                <input 
                    className='w-full px-2 py-1'
                    type="password" 
                    placeholder="Password"
                    ref={passwordInputRef}
                    required
                />
            </label>
           {!isLoggedIn && <label>
                <input 
                    className='w-full px-2 py-1'
                    type="password" 
                    placeholder="Confirm Password"
                    ref={confirmPasswordInputRef}
                    required
                />
            </label>}
            <button type='submit' className='bg-white py-1 rounded-full text-sky-700 text-lg font-bold'>{isLoggedIn ? 'Login ':'Sign Up'}</button>
        </form>

        <button onClick={switchAuthHandler} className='shadow-lg shadow-gray-100 px-6 py-4 w-[30vw] '>
            {isLoggedIn? <p className='w-full bg-white py-1 rounded-full'>Don't have an account? <span className='text-blue-600'>Sign Up</span></p> : <p className='w-full bg-white py-1 rounded-full'>Have an account? <span className='text-green-700'>Log In</span></p>}

        </button>
    </div>
  )
}

export default SignUp
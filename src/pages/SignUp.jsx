import React, { useRef, useState } from 'react'
import signupImage from '../assets/signup.jpg'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';



function SignUp() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userData, setUserData] = useState('');
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const apiKey = import.meta.env.VITE_MAILBOX_APIKEY;
    const db = import.meta.env.VITE_MAILBOX_DATABASE;
    const url = 'https://mail-box-client-2fd24-default-rtdb.firebaseio.com'

    const formHandler = async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current?.value;

        if (!isLoggedIn && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const url = isLoggedIn
            ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
            : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error.message);
            }

            const data = await response.json();
            if (isLoggedIn) {
                toast.success('Login Successfully...');
                dispatch(login(data.idToken));
                localStorage.setItem('email', data.email);
                navigate('/user-profile')
            } else {
                toast.success('Account created successfully...');
                const loginUserData = {
                    email: data.email,
                    token: data.idToken,
                    userId: data.localId,
                }
                dispatch(login(loginUserData))
            }
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            if (confirmPasswordInputRef.current) {
                confirmPasswordInputRef.current.value = '';
            }

            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const storingUserData = async (email) =>{       
        try {
            const response = await fetch(`${db}/mailBox/${email}.json`,{
                method: 'POST',
                body: JSON.stringify({
                    inbox: [],
                    sentBox: [],
                }),
                headers:{
                    "Content-Type": "application/json",
                }
            })
            if(!response.ok){
                const err = await response.json();
                console.log(err);
            }
        } catch (error) {
            
        }
    }

    const switchAuthHandler = () => {
        setIsLoggedIn((prev) => !prev);
    }

    return (
        <div style={{
            backgroundImage: `url(${signupImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
        }} className='flex flex-col gap-4 items-center justify-center p-4'>
            <form onSubmit={formHandler} className='flex flex-col gap-5 shadow-lg shadow-gray-100 px-6 py-10 w-full max-w-lg rounded-lg'>
                <label>
                    <input
                        className='w-full px-2 py-1  rounded'
                        type="email"
                        placeholder="Email"
                        ref={emailInputRef}
                        required
                    />
                </label>
                <label>
                    <input
                        className='w-full px-2 py-1  rounded'
                        type="password"
                        placeholder="Password"
                        ref={passwordInputRef}
                        required
                    />
                </label>
                {!isLoggedIn && <label>
                    <input
                        className='w-full px-2 py-1 rounded'
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordInputRef}
                        required
                    />
                </label>}
                <button type='submit' className='bg-white text-blue-500 py-2 rounded-full text-lg font-bold hover:bg-blue-700 transition duration-200'>
                    {isLoggedIn ? 'Login' : 'Sign Up'}
                </button>
            </form>

            <button onClick={switchAuthHandler} className='shadow-lg shadow-gray-100 px-6 py-4 w-full max-w-lg rounded-lg mt-4 text-white'>
                {isLoggedIn ? (
                    <p className='w-full text-center'>Don't have an account? <span >Sign Up</span></p>
                ) : (
                    <p className='w-full text-center'>Have an account? <span>Log In</span></p>
                )}
            </button>
        </div>
    )
}

export default SignUp

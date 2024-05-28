import React, {useRef} from 'react'
import signupImage from '../assets/signup.jpg'
import toast from 'react-hot-toast';

function SignUp() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef(); 


    const apiKey = import.meta.env.VITE_MAILBOX_APIKEY;
    const signUPUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`

    const formHandler = async (e) =>{
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value;

        try {
            const response = await fetch (`${signUPUrl}`,{
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
            console.log(data);
            toast.success('Account created successfully');
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordInputRef.current.value = '';
        } catch (error) {
            // console.log(error.message);
            toast.error(error.message)
        }
    }

  return (
    <div style={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    }} className='flex items-center justify-center'>
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
            <label>
                <input 
                    className='w-full px-2 py-1'
                    type="password" 
                    placeholder="Confirm Password"
                    ref={confirmPasswordInputRef}
                    required
                />
            </label>
            <button type='submit' className='bg-white py-1 rounded-2xl text-sky-700 text-lg font-bold'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div>
            <Header />
            <div className='absolute -z-10'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_medium.jpg' />
            </div>
            <div className='absolute w-1/3 mx-auto right-0 left-0 my-40 p-12 bg-black bg-opacity-70 rounded-md text-white'>
                <form>
                    <h1 className='text-3xl font-bold my-4 '>{isSignInForm ? 'Sign in' : 'Sign up'}</h1>
                    {isSignInForm && <input type='text' placeholder='Enter name' className='w-full p-2 my-2 bg-slate-800 bg-opacity-50' />}
                    <input type='email' placeholder='Enter email' className='w-full p-2 my-2 bg-slate-800 bg-opacity-50' />
                    <input type='password' placeholder='Enter password' className='w-full p-2 my-2 bg-slate-800 bg-opacity-50' />
                    <button type='submit' className='w-full p-2 my-7 rounded-md bg-red-600 '>{isSignInForm ? 'Sign in' : 'Sign up'}</button>
                    {!isSignInForm && <p className=' hover:cursor-pointer hover:underline' onClick={toggleSignInForm}>New to Netflix? Sign up now!</p>}
                    {isSignInForm && <p className=' hover:cursor-pointer hover:underline' onClick={toggleSignInForm}>Already have an account?</p>}
                </form>
            </div>
        </div>
    )
}

export default Login
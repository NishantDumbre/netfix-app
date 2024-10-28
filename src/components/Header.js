import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { auth } from '../utils/firebase'

const Header = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user
                dispatch(addUser({ uid, email, displayName, photoURL }))
                navigate('/browse')
            }
            else {
                dispatch(removeUser())
                navigate('/')
            }
        })
    }, [])

    const signOutHandler = () => {
        signOut(auth)
    }

    return (
        <div className='absolute w-screen px-8 py-2 flex justify-between z-20 bg-gradient-to-b from black'>
            <img src={process.env.REACT_APP_LOGO}
                className='w-40' alt='logo' />
            {user && <div className='flex items-center' >
                <img alt='profile pic' className='h-12 w-12' src={user?.photoURL} />
                <button type='button' onClick={signOutHandler} className='bg-red-600 text-sm h-1/2 p-2 rounded-sm mx-4 text-white' >Sign Out</button>
            </div>}
        </div>
    )
}

export default Header
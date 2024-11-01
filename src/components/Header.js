import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { auth } from "../utils/firebase";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const langRef = useRef("en");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
    }, []);

    const signOutHandler = () => {
        signOut(auth);
    };

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = () => {
        dispatch(changeLanguage(langRef.current.value));
    };

    return (
        <div className="absolute w-screen px-8 py-2 flex justify-between z-20 bg-gradient-to-b from-black">
            <img src={LOGO} className="w-40" alt="logo" />
            {user && (
                <div className="flex items-center">
                    {showGptSearch && <select
                        onChange={handleLanguageChange}
                        ref={langRef}
                        className="p-2 bg-slate-600 text-sm rounded-sm text-white bg-opacity-70"
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <option key={lang.identifier} value={lang.identifier}>
                                {lang.name}
                            </option>
                        ))}
                    </select>}
                    <button
                        type="button"
                        onClick={handleGptSearchClick}
                        className="bg-slate-600 text-sm h-1/2 p-2 rounded-sm mx-4 text-white  bg-opacity-70"
                    >
                        {showGptSearch ? "Homepage" : "GPT Search"}
                    </button>
                    <img alt="profile pic" className="h-12 w-12" src={user?.photoURL} />
                    <button
                        type="button"
                        onClick={signOutHandler}
                        className="bg-red-600 text-sm h-1/2 p-2 rounded-sm mx-4 text-white"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;

import React, { useState } from "react";
import Header from "./Header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter email"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please enter password"),
    name: Yup.string().when("isSignInForm", {
        is: false,
        then: Yup.string().required("Please enter name"),
    }),
});

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [isError, setIsError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleFormSubmit = (values) => {
        if (isSignInForm) {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                   navigate('/browse')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setIsError(errorCode + '-' + errorMessage)
                    setTimeout(() => {
                        setIsError('')
                    }, 5000);
                });

        }
        else if (!isSignInForm)
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)
                    updateProfile(user, {
                        displayName: "Nishant", photoURL: USER_AVATAR
                    }).then(() => {
                        console.log(user)
                        const { uid, email, displayName, photoURL } = auth.currentUser
                        dispatch(addUser({ uid, email, displayName, photoURL }))
                        navigate('/browse')
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setIsError(errorCode + '-' + errorMessage)
                        setTimeout(() => {
                            setIsError('')
                        }, 5000);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setIsError(errorCode + '-' + errorMessage)
                    setTimeout(() => {
                        setIsError('')
                    }, 5000);
                });
    }

    return (
        <div>
            <Header />
            <div className="absolute -z-10">
                <img src={BG_URL} alt="background" />
            </div>
            <div className="absolute w-1/3 mx-auto right-0 left-0 my-40 p-12 bg-black bg-opacity-70 rounded-md text-white">
                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleFormSubmit(values)
                        resetForm();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h1 className="text-3xl font-bold my-4 ">
                                {isSignInForm ? "Sign in" : "Sign up"}
                            </h1>
                            {!isSignInForm && (
                                <div>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        className={`w-full p-2 my-2 bg-slate-800 bg-opacity-50 ${touched.name && errors.name ? 'border-red-500' : ''}`}
                                    />
                                    <ErrorMessage name="name" component="div" className="text-md text-red-500" />
                                </div>
                            )}
                            <div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className={`w-full p-2 my-2 bg-slate-800 bg-opacity-50 ${touched.name && errors.name ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="email" component="div" className="text-md text-red-500" />
                            </div>
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className={`w-full p-2 my-2 bg-slate-800 bg-opacity-50 ${touched.name && errors.name ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage name="password" component="div" className="text-md text-red-500" />
                            </div>
                            {isError && <p className="text-md text-red-500 my-2">{isError}</p>}
                            <button
                                type="submit"
                                className="w-full p-2 my-7 rounded-md bg-red-600 "
                            >
                                {isSignInForm ? "Sign in" : "Sign up"}
                            </button>
                            {isSignInForm && (
                                <p
                                    className=" hover:cursor-pointer hover:underline"
                                    onClick={toggleSignInForm}
                                >
                                    New to Netflix? Sign up now!
                                </p>
                            )}
                            {!isSignInForm && (
                                <p
                                    className=" hover:cursor-pointer hover:underline"
                                    onClick={toggleSignInForm}
                                >
                                    Already have an account?
                                </p>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;

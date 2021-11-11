import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { CheckIcon, MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import { Input, Button } from '../../components/childs';

const Login = () => {

    const [darkMode, _] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [agree, setAgree] = useState(true);

    const authURL = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=profile%20email&response_type=code&client_id=350925341758-01aapceb4t5ggediildbvtbduu58obi1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2F3001-coffee-crab-nrvkf74j.ws-us18.gitpod.io%2Fapi%2Fv1%2Fauth%2Foauth-redirect'

    const benefits = [
        "No Server required",
        "NoSQL Databases",
        "Based on MongoDb functions",
        "Easy to use"
    ]

    const setTheForm = ({ target }: ChangeEvent<HTMLInputElement>): void => {
        setForm({ ...form, [target.name]: target.value });
    }

    const GoogleButton = () => (
        <a
            className="no-underline rounded-full bg-red-500 text-white flex items-center px-5 py-2 shadow-sm hover:shadow-md hover:bg-red-600 transition-all duration-150"
            href={authURL}
        >
            <p className="text-white text-bold tracking-wide font-poppins text-sm ">Sign In with Google</p>
        </a>
    )

    return (
        <div className={`${darkMode ? 'dark' : ''} `}>

            <Head>
                <title>Login - QuickServer</title>
                <meta name="description" content="QuickServer signin page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header Section */}
            <section className="flex items-center justify-between px-16 py-8 font-poppins bg-blue-50">
                <h1 className="text-sm font-bold select-none tracking-wide">quick:<span className="text-red-400">Server</span></h1>

                {/* <Link href="/auth/signup" passHref={true}>
                    <h5 className="text-sm font-bold tracking-wide">Register</h5>
                </Link> */}
            </section>

            <section className="grid grid-cols-2 justify-center items-center bg-blue-50 px-20" style={{ height: "88vh" }}>

                {/* Adverstise */}
                <div className="flex flex-col">
                    <h2 className="text-4xl font-bold font-poppins tracking-wide mb-10">Log In to <span className="text-red-400 underline">QuickServer</span> and continue creating your dream apps.</h2>

                    <h5 className="mb-5 font-bold text-md tracking-wide text-gray-800 font-poppins">The benefits of this service</h5>
                    <ul className="list-none p-0">
                        {benefits.map((value, key) => (
                            <li className="flex items-center mb-3 select-none" key={key}>
                                {/* Check Icons */}
                                <div className="text-center bg-white p-2 mr-5 rounded-full">
                                    <CheckIcon className="w-4 h-4 text-green-500 font-bold" />
                                </div>

                                <p className="font-poppins font-bold text-gray-800 tracking-wider text-xs">{value}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form */}
                <div className="flex items-center justify-center flex-col">
                    <form className="w-4/6">
                        <Input Icon={MailIcon} label="Email address..." name="email" type="email" onChange={setTheForm} value={form.email} />
                        <Input Icon={LockClosedIcon} label="Password..." name="password" type="password" onChange={setTheForm} value={form.password} />

                        <div className="flex items-center font-poppins mb-8 cursor-pointer">
                            <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} className="mr-5 cursor-pointer" />
                            <label htmlFor="agree" className="text-xs cursor-pointer select-none">I agree to all the <span className="text-red-400 font-bold tracking-wide">Terms and Condition</span></label>
                        </div>

                        <Button type="button" full>Submit</Button>
                    </form>

                    <span className="mt-5 mb-5 font-bold text-gray-400 tracking-wider font-poppins text-sm select-none">Or simply</span>

                    <GoogleButton />
                </div>
            </section>
        </div>
    )

}

export default Login
import { useState, useEffect, useCallback, createRef, FunctionComponent } from 'react';
import { useRouter } from 'next/router'

import Image from 'next/image';
import { ChatAlt2Icon } from '@heroicons/react/outline';


type HeaderProps = { currentItem: string }
const Header: FunctionComponent<HeaderProps> = ({ currentItem }) => {

    const [profileOpened, setProfileOpened] = useState(false);

    const router = useRouter();

    const headerItem = [
        {
            title: "Projects", slug: "projects", onClick: () => {
                document.title = "Loading..."
                router.push('/')
            }
        },
        {
            title: "Apps", slug: "apps", onClick: () => {
                document.title = "Loading..."
                router.push('apps')
            }
        }
    ]

    const profileItem = [
        { label: "Account", onClick: () => console.log("Account clicked") },
        { label: "Logout", onClick: () => console.log("Logout clicked") }
    ]

    const profileDropdownRef = createRef<HTMLDivElement>();

    const closeDropdown = useCallback((e) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) return setProfileOpened(false);
    }, [profileDropdownRef]);

    useEffect(() => {

        document.addEventListener('mousedown', closeDropdown);

        return () => document.removeEventListener('mousedown', closeDropdown);

    }, [closeDropdown]);


    return (
        <section className="flex items-center justify-between px-16 py-5 border-b sticky z-10 top-0 bg-white shadow-sm">

            {/* Logo Brand */}
            <h1 className="text-md font-bold select-none font-poppins">quick:<span className="text-red-400">Server</span></h1>

            <div className="flex items-center font-roboto">
                <div className="mr-10 flex items-center">
                    {headerItem.map((item, key) => (
                        <h5 onClick={item.onClick} key={key} className={`text-sm cursor-pointer font-bold tracking-wide mr-6 active:text-red-400 hover:text-red-400 duration-150 transition-all ${currentItem === item.slug ? 'text-red-400 hover:text-red-500' : ''}`}>{item.title}</h5>
                    ))}
                </div>

                <div className="flex items-center ml-10">
                    <ChatAlt2Icon className="w-6 h-6 cursor-pointer hover:text-red-400 duration-150 mr-7" />
                    <div className="relative inline-block text-left">
                        <button onClick={() => setProfileOpened(!profileOpened)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500 inline-flex" type="button">
                            <Image
                                src="/favicon.ico"
                                width={30}
                                height={30}
                                alt="QuickServer user's profile"
                                objectFit="cover"
                                loading="lazy"
                                className="rounded-full"
                            />
                        </button>

                        <div ref={profileDropdownRef} className={`absolute py-2 w-56 right-0 rounded-md shadow-md border border-gray-100 transition-all duration-200 ${profileOpened ? 'scale-100 opacity-100' : 'scale-0 opacity-0 '}`}>
                            <ul className="list-none w-full">
                                {profileItem.map((item, key) => (
                                    <li className="cursor-pointer px-4 py-2 bg-white text-gray-700 block text-sm hover:bg-gray-100 hover:text-gray-900 font-poppins duration-150 transition-all" key={key} onClick={item.onClick}>{item.label}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Header
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MainLayout ({children}) {
    const router = useRouter();
    const [localToken, setLocalToken] = useState("");
    const [sessionToken, setSessionToken] = useState("");

    useEffect(() => {
        const localTkn = localStorage.getItem('token');
        const sessionTkn = sessionStorage.getItem('token');
        setLocalToken(localTkn);
        setSessionToken(sessionTkn);
    }, [localToken, sessionToken]);

    function deleteToken () {
        if (localToken) {
            const localTknEmpty = localStorage.removeItem('token');
            setLocalToken(localTknEmpty);
            window.location.reload();
            router.push('/');
        }
        else if (sessionToken) {
            const sessionTknEmpty = sessionStorage.removeItem('token');
            setSessionToken(sessionTknEmpty);
            window.location.reload();
            router.push('/');
        }
    };

    return (
        <>
            <nav className="w-full flex flex-row justify-center text-2xl bg-neutral-50 sticky top-0">
                <div className="flex flex-row justify-between items-center w-[90%] p-1 bg-neutral-50">
                    <div className="hidden md:flex flex-row gap-8 w-[70%]">
                        <Link href="/">
                                <Image
                                src="/devto.svg"
                                alt="Logo devto"
                                className="bg-black rounded-[3px]"
                                width={40}
                                height={0}
                                priority
                                />
                        </Link>
                        <div className="border-solid border-[0.5px] border-gray-400 flex flex-row gap-8 w-[90%] justify-between items-center rounded-[0.8rem] hover:border-gray-600 focus-within:border-blue-700 focus-within:border-2">
                            <button className="hover:bg-blue-200 h-full rounded-lg">
                                <Image
                                src="/search.svg"
                                alt="search"
                                width={30}
                                height={0}
                                priority
                                className="p-[5px]"
                                />
                            </button>
                            <input type="text" placeholder="Search..." className="flex-grow h-full focus:outline-none"/>
                        </div>
                    </div>
                    {
                        (!localToken && !sessionToken) && (<div className="hidden md:flex flex-row w-[20%] justify-end gap-12 p-4">
                            <Link href="/login" className="p-5 hover:bg-indigo-100 rounded-[5px] hover:text-blue-700 hover:underline text-xl text-center">Log in</Link>
                            <Link href="/createAccount" className="p-5 text-blue-700 border-solid border-[1px] border-blue-700 rounded-[5px] hover:text-white hover:bg-blue-700 hover:underline text-xl text-center">Create account</Link>
                        </div>)
                    }
                    {
                        (localToken || sessionToken) && (<div className="hidden md:flex flex-row w-[20%] justify-end gap-12">
                            <Link href="/createPost" className="p-5 text-blue-700 border-solid border-[1px] border-blue-700 rounded-[5px] hover:text-white hover:bg-blue-700 hover:underline text-xl text-center">Create post</Link>
                            <button className="p-2 rounded-lg hover:bg-indigo-100">
                            <Image
                                src="/campana.svg"
                                alt="campana"
                                width={30}
                                height={0}
                                priority
                                className="p-[5px]"
                                />
                            </button>
                            <button onClick={deleteToken} className="p-5 hover:bg-indigo-100 border-[1px] rounded-[5px] hover:border-blue-700 hover:text-blue-700 hover:underline text-xl text-center">Log out</button>
                        </div>)
                    }

                    <div className="flex flex-row gap-6 md:hidden">
                        <button className="rounded-[5px] hover:bg-indigo-100 h-full">
                            <Image
                                src="/menu.svg"
                                alt="menu"
                                width={30}
                                height={0}
                                priority
                                className="w-[4rem] h-[5rem]"
                            />
                        </button>
                        <Link href="/" className="mt-4">
                            <Image
                            src="/devto.svg"
                            alt="Logo devto"
                            className="bg-black rounded-lg"
                            width={30}
                            height={0}
                            priority
                            />
                        </Link>
                    </div>
                    {
                        (!localToken && !sessionToken) && (<div className="flex flex-row gap-6 md:hidden">
                            <button className="rounded-[5px] hover:bg-indigo-100">
                                <Image
                                    src="/search.svg"
                                    alt="search"
                                    width={0}
                                    height={0}
                                    priority
                                    className="w-[4rem] h-[2rem]"
                                />
                            </button>
                            <Link href="/createAccount" className="p-5 text-blue-700 border-solid border-[1px] border-blue-700 rounded-[5px] hover:text-white hover:bg-blue-700 hover:underline text-center">Create account</Link>
                        </div>) 
                    }
                    {
                        (localToken || sessionToken) && (<div className="md:hidden flex flex-row w-[20%] justify-end gap-10">
                            <button className="rounded-[5px] hover:bg-indigo-100">
                                <Image
                                    src="/search.svg"
                                    alt="search"
                                    width={0}
                                    height={0}
                                    priority
                                    className="w-[4rem] h-[2rem]"
                                />
                            </button>
                            <Link href="/createPost" className="p-3 text-center text-blue-700 border-solid border-[1px] border-blue-700 rounded-[5px] hover:text-white hover:bg-blue-700 hover:underline text-lg">Create post</Link>
                            <button onClick={deleteToken} className="p-3 hover:bg-indigo-100 border-[1px] rounded-[5px] hover:border-blue-700 hover:text-blue-700 hover:underline text-lg text-center">Log out</button>
                        </div>)
                    }
                </div>
            </nav>

            <main>
                {children}
            </main>
        </>
    );
};
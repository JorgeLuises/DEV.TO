import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuItem from "./MenuItem";
import SocialMedia from "./SocialMedia";
import PersonalTags from "./PersonalTags";

export default function LeftAside () {
    const router = useRouter();
    const [localToken, setLocalToken] = useState("");
    const [sessionToken, setSessionToken] = useState("");

    useEffect(() => {
        const localTkn = localStorage.getItem('token');
        const sessionTkn = sessionStorage.getItem('token');
        setLocalToken(localTkn);
        setSessionToken(sessionTkn);
    }, [localToken, sessionToken]);

    function logIn () {
        router.push('/login');
    };

    function createAccount () {
        router.push('/createAccount');
    };

    const menuItems = [
        { icon: "🏠", label: "Home" },
        { icon: "🎙️", label: "Podcasts" },
        { icon: "🎥", label: "Videos" },
        { icon: "🏷️", label: "Tags" },
        { icon: "💡", label: "DEV Help" },
        { icon: "🛍️", label: "Forem Shop" },
        { icon: "❤️", label: "Advertise on DEV" },
        { icon: "🏆", label: "DEV Challenges" },
        { icon: "✨", label: "DEV Showcase" },
        { icon: "📰", label: "About" },
        { icon: "📞", label: "Contact" },
        { icon: "📚", label: "Guides" },
        { icon: "🤔", label: "Software comparisons" },
    ];

    const policyItems = [
        { icon: "👍", label: "Code of Conduct" },
        { icon: "🤓", label: "Privacy Policy" },
        { icon: "👀", label: "Terms of use" },
    ];
    
    return (
        <>
        <div className="hidden md:flex flex-col">
            {
                (!localToken && !sessionToken) && (
                <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6 text-center mb-2">
                    <h2 className="text-3xl font-bold mb-2 text-left">
                    DEV Community is a community of 1,692,174 amazing developers
                    </h2>
                    <p className="text-gray-600 mb-4 text-left text-2xl mt-8">
                    We re a place where coders share, stay up-to-date and grow their careers.
                    </p> 
                    <button 
                        className="w-full bg-transparent border border-[#3B49DF] text-[#3B49DF] hover:bg-[#3B49DF] hover:text-white font-semibold p-4 rounded-lg mb-2 text-2xl mt-4"
                        onClick={createAccount}
                    >
                        Create account
                    </button>
                    <button 
                        className="w-full text-black hover:bg-[#E4E4F3] hover:text-[#3B49DF] hover:underline p-4 rounded-lg mb-2 text-2xl"
                        onClick={logIn}
                    >
                        Login
                    </button>
                </div>)}
            <div className="max-w-sm bg-zinc-100 mx-auto mt-4 text-center mb-2 items-start">
            {
                    menuItems.map((items,index) => {
                        return(
                            <MenuItem
                                key={`menu-items-${index}`}
                                icon={items.icon}
                                label= {items.label}
                            />
                        )
                    })
                        
                    
                    
                }
                <div className="p-4 text-left font-bold text-3xl">Others</div>
                {
                    policyItems.map((items,index) => {
                        return(
                            <MenuItem
                                key={`policy-items-${index}`}
                                icon={items.icon}
                                label= {items.label}
                            />
                        )
                    })   
                }
            </div>
            <div className="max-w-sm bg-zinc-100 mx-auto mt-4 text-center mb-8 felx">
                <SocialMedia/>
            </div>
            <div className="max-w-sm bg-zinc-100 mx-auto mt-4 mb-8 w-full">
                <div className="flex flex-row items-center w-full justify-start mb-2">
                    <p className="font-bold text-3xl text-black flex-grow">My tags</p>
                    <button className="text-black hover:bg-indigo-200 hover:text-[#3B49DF] hover:underline p-2 rounded-lg">
                    <Image
                        src="/ajustes.svg"
                        alt="Logo devto"
                        width={25}
                        height={0}
                        priority
                        />
                    </button>
                </div>
                <div className="h-80 overflow-y-auto">
                    <PersonalTags/>
                </div>
            </div>
            <div>
                <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6 mt-4">
                    <div className="flex justify-between items-center my-8">
                        <span className="text-gray-500 text-2xl">DEV Community</span>
                        <button className="text-gray-500 text-2xl">•••</button>
                    </div>
                    <div className="flex justify-center mb-12">
                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--GkDXbK0b--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oky7tpxe4z0f8ksng5ta.png" alt="Dark Mode" className="rounded-lg " />
                    </div>
                <p className="text-5xl font-bold mb-2 text-black/70">Stay in the loop with the latest articles, trends, and tips in the developer community.<br/><span className="text-2xl font-bold text-blue-500 underline">Sign up for our newsletter now!</span></p>
                </div>
            </div>
            <div className="max-w-sm bg-zinc-100 mx-auto mt-12 text-center mb-2 items-start flex flex-col gap-y-5">
                <p className="text-gray-600 mb-4 text-left mt-4 text-2xl">
                    <span className="text-indigo-600 font-semibold hover:underline hover:text-indigo-700">DEV Community</span> A constructive and inclusive social network for software developers. With you every step of your journey.
                </p>
                <p className="text-gray-600 mb-4 text-left text-2xl">
                    Built on <span className="text-indigo-600 hover:underline hover:text-indigo-700">Forem</span> — the <span className="text-indigo-600 hover:underline hover:text-indigo-700">open source</span> software that powers <span className="text-indigo-600 hover:underline hover:text-indigo-700">DEV</span> and other inclusive communities.
                </p>
                <p className="text-gray-600 mb-4 text-left text-2xl">
                    Made with love and <span className="text-indigo-600 hover:underline hover:text-indigo-700">Ruby on Rails.</span> DEV Community © 2016 - 2024.
                </p>
            </div>
        </div>
        </>
        
    )
}
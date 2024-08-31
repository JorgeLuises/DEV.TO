import { Link } from "@mui/material";
import Image from "next/image";
import CreateAccountButton from "@/components/CreateAccountButton";

export default function CreateAccount () {
    const socialMedias = [
        {text: 'Sign up with Apple', img: '/apple.svg'},
        {text: 'Sign up with Facebook', img: '/facebook.svg'},
        {text: 'Sign up with Forem', img: '/forem.svg'},
        {text: 'Sign up with GitHub', img: '/github.svg'},
        {text: 'Sign up with Google', img: '/google.svg'},
        {text: 'Sign up with Twitter (x)', img: '/twitter.svg'},
        {text: 'Sign up with Email (x)', img: '/email.svg'}
    ]
    
    return (
        <main className="w-full flex justify-center">
            <div className="w-[50%] mt-8 mb-12 flex flex-col items-center gap-4">
                <Link href="/" className="p-4">
                    <Image
                    src="/devto.svg"
                    alt="Logo devto"
                    className="bg-black rounded-[3px] w-[50px]"
                    width={0}
                    height={0}
                    priority
                    />
                </Link>
                <h1 className="text-black text-5xl font-bold text-center">Join the DEV Community</h1>
                <p className="text-2xl text-neutral-700 text-center mb-4">DEV Community is a community of 1,683,678 amazing developers</p>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    {
                        socialMedias.map((socialMedia, index) => {
                            return (
                                <CreateAccountButton
                                key={index}
                                img={socialMedia.img}
                                text={socialMedia.text}/>
                            );
                        })
                    }
                </div>
                <div className="w-full md:w-[60%]">
                    <p className="text-2xl text-neutral-500 text-center mt-4 italic">By signing in, you are agreeing to our <a href="#" className="text-blue-700">privacy policy, terms of use</a> and <a href="#" className="text-blue-700">code of conduct.</a>
                    </p>
                </div>
                <hr className="h-[1px] m-6 bg-gray-300 border-none w-full md:w-[75%]"/>
                <div className="flex items-center justify-center">
                    <p className="text-2xl text-center">Already have an account? <Link href="/login" className="text-blue-700 no-underline">Log in.</Link></p>
                </div>
            </div>
        </main>
    )
}